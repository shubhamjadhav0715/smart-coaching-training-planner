const mongoose = require('mongoose');

const coachResponseSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Response message is required'],
    maxlength: [2000, 'Response message cannot exceed 2000 characters']
  },
  respondedAt: {
    type: Date,
    default: Date.now
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { _id: false });

const feedbackSchema = new mongoose.Schema({
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
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Coach ID is required'],
    validate: {
      validator: async function(value) {
        const User = mongoose.model('User');
        const coach = await User.findById(value);
        return coach && coach.role === 'coach';
      },
      message: 'Invalid coach ID or user is not a coach'
    }
  },
  trainingPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingPlan'
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },
  type: {
    type: String,
    enum: {
      values: ['workout', 'plan', 'general', 'injury', 'progress'],
      message: '{VALUE} is not a valid feedback type'
    },
    required: [true, 'Feedback type is required']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5']
  },
  message: {
    type: String,
    required: [true, 'Feedback message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high', 'urgent'],
      message: '{VALUE} is not a valid priority level'
    },
    default: 'medium'
  },
  coachResponse: coachResponseSchema,
  status: {
    type: String,
    enum: {
      values: ['pending', 'reviewed', 'resolved', 'archived'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
feedbackSchema.index({ athleteId: 1, createdAt: -1 });
feedbackSchema.index({ coachId: 1, status: 1 });
feedbackSchema.index({ trainingPlanId: 1 });
feedbackSchema.index({ workoutId: 1 });
feedbackSchema.index({ status: 1, priority: 1 });
feedbackSchema.index({ isRead: 1 });

// Virtual for response time
feedbackSchema.virtual('responseTime').get(function() {
  if (!this.coachResponse?.respondedAt) return null;
  const diff = this.coachResponse.respondedAt - this.createdAt;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return `${hours} hours`;
});

// Virtual for is urgent
feedbackSchema.virtual('isUrgent').get(function() {
  return this.priority === 'urgent' || this.type === 'injury';
});

// Pre-save middleware to auto-set priority for injury feedback
feedbackSchema.pre('save', function(next) {
  if (this.type === 'injury' && !this.priority) {
    this.priority = 'urgent';
  }
  
  if (this.isModified('isRead') && this.isRead && !this.readAt) {
    this.readAt = new Date();
  }
  
  if (this.coachResponse && !this.status) {
    this.status = 'reviewed';
  }
  
  next();
});

// Static method to get pending feedback count for a coach
feedbackSchema.statics.getPendingCount = async function(coachId) {
  return await this.countDocuments({ 
    coachId, 
    status: 'pending',
    isRead: false 
  });
};

// Static method to get urgent feedback for a coach
feedbackSchema.statics.getUrgentFeedback = async function(coachId) {
  return await this.find({ 
    coachId, 
    status: { $in: ['pending', 'reviewed'] },
    priority: 'urgent'
  }).sort({ createdAt: -1 });
};

module.exports = mongoose.model('Feedback', feedbackSchema);
