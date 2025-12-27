const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  athleteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
    enum: ['workout', 'plan', 'general'],
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  message: {
    type: String,
    required: true
  },
  coachResponse: {
    message: String,
    respondedAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
