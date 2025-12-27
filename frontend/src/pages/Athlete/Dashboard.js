import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const AthleteDashboard = () => {
  const { user, logout } = useAuth();
  const [plans, setPlans] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
    fetchWorkouts();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/athlete/plans');
      setPlans(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch training plans');
      setLoading(false);
    }
  };

  const fetchWorkouts = async () => {
    try {
      const response = await api.get('/athlete/workouts');
      setWorkouts(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch workouts');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Athlete Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button onClick={logout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">Active Plans</h3>
            <p className="text-3xl font-bold text-blue-600">{plans.length}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">Workouts Logged</h3>
            <p className="text-3xl font-bold text-green-600">{workouts.length}</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-700">This Week</h3>
            <p className="text-3xl font-bold text-purple-600">
              {workouts.filter(w => {
                const workoutDate = new Date(w.date);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return workoutDate >= weekAgo;
              }).length}
            </p>
          </div>
        </div>

        {/* Training Plans */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">My Training Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div key={plan._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-2">{plan.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Category: </span>
                  <span className="text-sm font-semibold">{plan.category}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Coach: </span>
                  <span className="text-sm font-semibold">{plan.coachId?.name}</span>
                </div>
                <div className="mb-3">
                  <span className="text-sm text-gray-500">Duration: </span>
                  <span className="text-sm font-semibold">
                    {plan.duration?.weeks} weeks, {plan.duration?.sessionsPerWeek} sessions/week
                  </span>
                </div>
                <button className="btn-primary w-full">
                  View Details
                </button>
              </div>
            ))}
          </div>
          {plans.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No training plans assigned yet. Contact your coach!
            </p>
          )}
        </div>

        {/* Recent Workouts */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Workouts</h2>
            <button
              onClick={() => setShowLogModal(true)}
              className="btn-primary"
            >
              Log Workout
            </button>
          </div>

          <div className="space-y-4">
            {workouts.slice(0, 10).map((workout) => (
              <div key={workout._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{workout.trainingPlanId?.title || 'General Workout'}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(workout.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    workout.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {workout.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Duration: </span>
                    <span className="font-semibold">{workout.totalDuration} min</span>
                  </div>
                  {workout.caloriesBurned && (
                    <div>
                      <span className="text-gray-500">Calories: </span>
                      <span className="font-semibold">{workout.caloriesBurned}</span>
                    </div>
                  )}
                  {workout.difficultyRating && (
                    <div>
                      <span className="text-gray-500">Difficulty: </span>
                      <span className="font-semibold">{workout.difficultyRating}/10</span>
                    </div>
                  )}
                  {workout.mood && (
                    <div>
                      <span className="text-gray-500">Mood: </span>
                      <span className="font-semibold capitalize">{workout.mood}</span>
                    </div>
                  )}
                </div>
                {workout.notes && (
                  <p className="text-sm text-gray-600 mt-2">{workout.notes}</p>
                )}
              </div>
            ))}
          </div>

          {workouts.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No workouts logged yet. Start tracking your progress!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;
