const TrainingPlan = require('../models/TrainingPlan');
const User = require('../models/User');
const Workout = require('../models/Workout');
const Performance = require('../models/Performance');
const Feedback = require('../models/Feedback');
const { sendPlanAssignment, sendFeedbackResponse } = require('../utils/emailService');
const { generatePlanReport } = require('../utils/pdfService');

exports.createTrainingPlan = async (req, res) => {
  try {
    const planData = {
      ...req.body,
      coachId: req.user.id
    };

    const plan = await TrainingPlan.create(planData);

    if (plan.athleteIds && plan.athleteIds.length > 0) {
      const athletes = await User.find({ _id: { $in: plan.athleteIds } });
      
      for (const athlete of athletes) {
        await sendPlanAssignment(athlete.email, athlete.name, {
          title: plan.title,
          category: plan.category,
          duration: plan.duration,
          startDate: plan.startDate,
          description: plan.description
        });
      }
    }

    res.status(201).json({
      success: true,
      data: plan,
      message: 'Training plan created and athletes notified'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getMyPlans = async (req, res) => {
  try {
    const plans = await TrainingPlan.find({ coachId: req.user.id })
      .populate('athleteIds', 'name email sportsCategory')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const plan = await TrainingPlan.findById(req.params.id)
      .populate('athleteIds', 'name email phone sportsCategory')
      .populate('coachId', 'name email');

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch plan'
    });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    let plan = await TrainingPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    if (plan.coachId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this plan'
      });
    }

    plan = await TrainingPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await TrainingPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    if (plan.coachId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this plan'
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Training plan deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyAthletes = async (req, res) => {
  try {
    const athletes = await User.find({ 
      role: 'athlete',
      coachId: req.user.id 
    }).select('-password');

    res.status(200).json({
      success: true,
      count: athletes.length,
      data: athletes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAthleteProgress = async (req, res) => {
  try {
    const { athleteId } = req.params;

    const workouts = await Workout.find({ athleteId })
      .sort('-date')
      .limit(30);

    const performance = await Performance.find({ athleteId })
      .sort('-date')
      .limit(10);

    const totalWorkouts = await Workout.countDocuments({ athleteId });
    const totalDuration = workouts.reduce((sum, w) => sum + (w.totalDuration || 0), 0);
    const avgDifficulty = workouts.length > 0
      ? workouts.reduce((sum, w) => sum + (w.difficultyRating || 0), 0) / workouts.length
      : 0;

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalWorkouts,
          totalDuration: Math.round(totalDuration / 60),
          avgDifficulty: avgDifficulty.toFixed(1)
        },
        workouts,
        performance
      }
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch athlete progress'
    });
  }
};

exports.respondToFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    
    const feedback = await Feedback.findById(req.params.id)
      .populate('athleteId', 'name email');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    if (feedback.coachId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    feedback.coachResponse = {
      message,
      respondedAt: Date.now()
    };
    feedback.status = 'reviewed';

    await feedback.save();

    await sendFeedbackResponse(
      feedback.athleteId.email,
      feedback.athleteId.name,
      {
        originalMessage: feedback.message,
        response: message
      }
    );

    res.status(200).json({
      success: true,
      data: feedback,
      message: 'Response sent and athlete notified'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.downloadPlanReport = async (req, res) => {
  try {
    const plan = await TrainingPlan.findById(req.params.id)
      .populate('athleteIds', 'name email sportsCategory');

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Training plan not found'
      });
    }

    if (plan.coachId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const result = await generatePlanReport(plan, plan.athleteIds);

    if (result.success) {
      res.download(result.filePath, result.fileName, (err) => {
        if (err) {
          console.error('Download error:', err);
          res.status(500).json({ success: false, message: 'Error downloading file' });
        }
      });
    } else {
      res.status(500).json({ success: false, message: 'Failed to generate report' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
