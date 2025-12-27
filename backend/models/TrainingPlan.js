const mongoose = require('mongoose');

const trainingPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  athleteIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    enum: ['strength', 'endurance', 'skills', 'flexibility', 'speed', 'mixed'],
    required: true
  },
  duration: {
    weeks: {
      type: Number,
      required: true
    },
    sessionsPerWeek: {
      type: Number,
      required: true
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  workouts: [{
    day: Number,
    title: String,
    exercises: [{
      name: String,
      sets: Number,
      reps: String,
      duration: String,
      intensity: String,
      notes: String
    }],
    restDay: {
      type: Boolean,
      default: false
    }
  }],
  goals: [{
    metric: String,
    target: String,
    deadline: Date
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'archived'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TrainingPlan', trainingPlanSchema);
