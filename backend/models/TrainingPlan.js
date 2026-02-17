const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true
  },
  sets: {
    type: Number,
    min: [1, 'Sets must be at least 1']
  },
  reps: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high', 'very high'],
    default: 'medium'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, { _id: true });

const workoutSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, 'Day number is required'],
    min: [1, 'Day must be at least 1']
  },
  title: {
    type: String,
    required: [true, 'Workout title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  exercises: [exerciseSchema],
  restDay: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const goalSchema = new mongoose.Schema({
  metric: {
    type: String,
    required: [true, 'Goal metric is required'],
    trim: true
  },
  target: {
    type: String,
    required: [true, 'Goal target is required'],
    trim: true
  },
  deadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Deadline must be in the future'
    }
  }
}, { _id: true });

const trainingPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
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
  athleteIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async function(value) {
        const User = mongoose.model('User');
        const athlete = await User.findById(value);
        return athlete && athlete.role === 'athlete';
      },
      message: 'Invalid athlete ID or user is not an athlete'
    }
  }],
  category: {
    type: String,
    enum: {
      values: ['strength', 'endurance', 'skills', 'flexibility', 'speed', 'mixed'],
      message: '{VALUE} is not a valid category'
    },
    required: [true, 'Category is required']
  },
  duration: {
    weeks: {
      type: Number,
      required: [true, 'Duration in weeks is required'],
      min: [1, 'Duration must be at least 1 week'],
      max: [52, 'Duration cannot exceed 52 weeks']
    },
    sessionsPerWeek: {
      type: Number,
      required: [true, 'Sessions per week is required'],
      min: [1, 'Must have at least 1 session per week'],
      max: [7, 'Cannot have more than 7 sessions per week']
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  workouts: [workoutSchema],
  goals: [goalSchema],
  status: {
    type: String,
    enum: {
      values: ['draft', 'active', 'completed', 'archived'],
      message: '{VALUE} is not a valid status'
    },
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completionRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
trainingPlanSchema.index({ coachId: 1, status: 1 });
trainingPlanSchema.index({ athleteIds: 1 });
trainingPlanSchema.index({ startDate: 1, endDate: 1 });
trainingPlanSchema.index({ category: 1 });
trainingPlanSchema.index({ isActive: 1 });

// Virtual for total days
trainingPlanSchema.virtual('totalDays').get(function() {
  return this.duration.weeks * 7;
});

// Virtual for total sessions
trainingPlanSchema.virtual('totalSessions').get(function() {
  return this.duration.weeks * this.duration.sessionsPerWeek;
});

// Virtual for progress percentage
trainingPlanSchema.virtual('progressPercentage').get(function() {
  if (!this.startDate || !this.endDate) return 0;
  
  const now = new Date();
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  
  if (now < start) return 0;
  if (now > end) return 100;
  
  const totalDuration = end - start;
  const elapsed = now - start;
  
  return Math.round((elapsed / totalDuration) * 100);
});

// Pre-save middleware to validate dates
trainingPlanSchema.pre('save', function(next) {
  if (this.isModified('startDate') || this.isModified('endDate')) {
    const expectedEndDate = new Date(this.startDate);
    expectedEndDate.setDate(expectedEndDate.getDate() + (this.duration.weeks * 7));
    
    // Allow some flexibility (±1 day)
    const daysDiff = Math.abs((this.endDate - expectedEndDate) / (1000 * 60 * 60 * 24));
    if (daysDiff > 1) {
      console.warn('End date does not match duration calculation');
    }
  }
  next();
});

module.exports = mongoose.model('TrainingPlan', trainingPlanSchema);
