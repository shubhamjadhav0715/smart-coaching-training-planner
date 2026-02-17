const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
    maxlength: [100, 'Exercise name cannot exceed 100 characters']
  },
  setsCompleted: {
    type: Number,
    min: [0, 'Sets completed must be positive'],
    max: [100, 'Sets completed cannot exceed 100']
  },
  repsCompleted: {
    type: String,
    trim: true,
    maxlength: [50, 'Reps completed cannot exceed 50 characters']
  },
  durationCompleted: {
    type: String,
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters']
  },
  weight: {
    type: String,
    trim: true,
    maxlength: [50, 'Weight cannot exceed 50 characters']
  },
  notes: {
    type: String,
    maxlength: [500, 'Exercise notes cannot exceed 500 characters']
  }
}, { _id: true });

const injuryLogSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    required: [true, 'Body part is required'],
    trim: true,
    maxlength: [50, 'Body part cannot exceed 50 characters']
  },
  severity: {
    type: String,
    enum: {
      values: ['minor', 'moderate', 'severe'],
      message: '{VALUE} is not a valid severity level'
    },
    required: [true, 'Severity is required']
  },
  description: {
    type: String,
    maxlength: [500, 'Injury description cannot exceed 500 characters']
  }
}, { _id: true });

const workoutSchema = new mongoose.Schema({
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
  trainingPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingPlan',
    required: [true, 'Training plan ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Workout date is required'],
    default: Date.now,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Workout date cannot be in the future'
    }
  },
  exercises: {
    type: [exerciseLogSchema],
    validate: {
      validator: function(value) {
        return !this.completed || (value && value.length > 0);
      },
      message: 'Completed workouts must have at least one exercise'
    }
  },
  totalDuration: {
    type: Number,
    required: [true, 'Total duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
    max: [600, 'Duration cannot exceed 600 minutes (10 hours)']
  },
  caloriesBurned: {
    type: Number,
    min: [0, 'Calories burned must be positive'],
    max: [5000, 'Calories burned cannot exceed 5000']
  },
  difficultyRating: {
    type: Number,
    min: [1, 'Difficulty rating must be between 1 and 10'],
    max: [10, 'Difficulty rating must be between 1 and 10']
  },
  fatigueLevel: {
    type: Number,
    min: [1, 'Fatigue level must be between 1 and 10'],
    max: [10, 'Fatigue level must be between 1 and 10']
  },
  mood: {
    type: String,
    enum: {
      values: ['excellent', 'good', 'average', 'poor', 'exhausted'],
      message: '{VALUE} is not a valid mood'
    }
  },
  notes: {
    type: String,
    maxlength: [2000, 'Notes cannot exceed 2000 characters']
  },
  injuries: [injuryLogSchema],
  completed: {
    type: Boolean,
    default: true
  },
  skipped: {
    type: Boolean,
    default: false
  },
  skipReason: {
    type: String,
    maxlength: [500, 'Skip reason cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
workoutSchema.index({ athleteId: 1, date: -1 });
workoutSchema.index({ trainingPlanId: 1 });
workoutSchema.index({ date: -1 });
workoutSchema.index({ completed: 1 });

// Virtual for workout intensity score
workoutSchema.virtual('intensityScore').get(function() {
  if (!this.difficultyRating || !this.totalDuration) return null;
  return ((this.difficultyRating * this.totalDuration) / 10).toFixed(2);
});

// Virtual for recovery indicator
workoutSchema.virtual('needsRecovery').get(function() {
  if (!this.fatigueLevel) return false;
  return this.fatigueLevel >= 8 || this.injuries.length > 0;
});

// Pre-save validation
workoutSchema.pre('save', function(next) {
  if (this.skipped && this.completed) {
    next(new Error('Workout cannot be both skipped and completed'));
  } else if (this.skipped && !this.skipReason) {
    next(new Error('Skip reason is required for skipped workouts'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
