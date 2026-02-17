const mongoose = require('mongoose');

const restrictionSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: [true, 'Activity restriction is required'],
    trim: true,
    maxlength: [100, 'Activity cannot exceed 100 characters']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, { _id: true });

const followUpSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Follow-up date is required']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, { _id: true, timestamps: true });

const injurySchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Athlete ID is required'],
    validate: {
      validator: async function(value) {
        const User = mongoose.model('User');
        const athlete = await User.findById(value);
        return athlete && athlete.role === 'athlete';
      },
      message: 'Invalid athlete ID or user is not an athlete'
    }
  },
  bodyPart: {
    type: String,
    required: [true, 'Please specify the injured body part'],
    trim: true,
    maxlength: [100, 'Body part cannot exceed 100 characters']
  },
  severity: {
    type: String,
    enum: {
      values: ['minor', 'moderate', 'severe', 'critical'],
      message: '{VALUE} is not a valid severity level'
    },
    required: [true, 'Severity is required']
  },
  description: {
    type: String,
    required: [true, 'Please provide injury description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  dateOccurred: {
    type: Date,
    required: [true, 'Date occurred is required'],
    default: Date.now,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Injury date cannot be in the future'
    }
  },
  expectedRecoveryDate: {
    type: Date,
    validate: {
      validator: function(value) {
        if (!value) return true;
        return value > this.dateOccurred;
      },
      message: 'Expected recovery date must be after injury date'
    }
  },
  actualRecoveryDate: {
    type: Date,
    validate: {
      validator: function(value) {
        if (!value) return true;
        return value >= this.dateOccurred;
      },
      message: 'Actual recovery date must be on or after injury date'
    }
  },
  treatment: {
    type: String,
    maxlength: [2000, 'Treatment description cannot exceed 2000 characters']
  },
  restrictions: [restrictionSchema],
  status: {
    type: String,
    enum: {
      values: ['active', 'recovering', 'recovered', 'chronic'],
      message: '{VALUE} is not a valid status'
    },
    default: 'active'
  },
  coachNotes: {
    type: String,
    maxlength: [2000, 'Coach notes cannot exceed 2000 characters']
  },
  medicalNotes: {
    type: String,
    maxlength: [2000, 'Medical notes cannot exceed 2000 characters']
  },
  followUpDates: [followUpSchema],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  relatedWorkoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },
  painLevel: {
    type: Number,
    min: [0, 'Pain level must be between 0 and 10'],
    max: [10, 'Pain level must be between 0 and 10']
  },
  requiresMedicalAttention: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
injurySchema.index({ athleteId: 1, status: 1 });
injurySchema.index({ dateOccurred: -1 });
injurySchema.index({ severity: 1 });
injurySchema.index({ status: 1 });

// Virtual for recovery duration
injurySchema.virtual('recoveryDuration').get(function() {
  if (!this.actualRecoveryDate) return null;
  const diff = this.actualRecoveryDate - this.dateOccurred;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} days`;
});

// Virtual for is overdue
injurySchema.virtual('isOverdue').get(function() {
  if (!this.expectedRecoveryDate || this.status === 'recovered') return false;
  return new Date() > this.expectedRecoveryDate;
});

// Virtual for days since injury
injurySchema.virtual('daysSinceInjury').get(function() {
  const diff = new Date() - this.dateOccurred;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to auto-update status
injurySchema.pre('save', function(next) {
  if (this.actualRecoveryDate && this.status !== 'recovered') {
    this.status = 'recovered';
  }
  
  if (this.severity === 'critical' && !this.requiresMedicalAttention) {
    this.requiresMedicalAttention = true;
  }
  
  next();
});

// Static method to get active injuries for an athlete
injurySchema.statics.getActiveInjuries = async function(athleteId) {
  return await this.find({ 
    athleteId, 
    status: { $in: ['active', 'recovering'] }
  }).sort({ dateOccurred: -1 });
};

// Static method to get injury statistics
injurySchema.statics.getInjuryStats = async function(athleteId) {
  const injuries = await this.find({ athleteId });
  
  return {
    total: injuries.length,
    active: injuries.filter(i => i.status === 'active').length,
    recovering: injuries.filter(i => i.status === 'recovering').length,
    recovered: injuries.filter(i => i.status === 'recovered').length,
    chronic: injuries.filter(i => i.status === 'chronic').length,
    bySeverity: {
      minor: injuries.filter(i => i.severity === 'minor').length,
      moderate: injuries.filter(i => i.severity === 'moderate').length,
      severe: injuries.filter(i => i.severity === 'severe').length,
      critical: injuries.filter(i => i.severity === 'critical').length
    }
  };
};

module.exports = mongoose.model('Injury', injurySchema);
