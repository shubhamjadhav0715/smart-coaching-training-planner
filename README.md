# Smart Coaching & Training Planner

A comprehensive MERN stack web application for managing sports training programs, enabling coaches to create personalized training plans and athletes to track their progress.

## Features

### Admin Module
- Manage coaches, athletes, and sports categories
- Monitor overall training activity and system usage
- Generate performance and participation reports

### Coach Module
- Create customized training plans (strength, endurance, skills)
- Assign workouts and drills to individual athletes or teams
- Track athlete progress using performance metrics and graphs
- Provide feedback and adjust training plans accordingly

### Athlete Module
- Secure login to view assigned training schedules
- Log daily workouts and performance data
- Track progress and improvement history
- Submit feedback on training difficulty and fatigue levels

### Additional Features
- Progress visualization using charts and analytics
- Training reminders via email or notifications
- Injury prevention tracking and rest-day planning
- Export training reports in PDF/Excel format
- Mobile-friendly design for on-field access

## Technology Stack

- **Frontend**: React.js with React Router, Axios, Recharts, React Toastify
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & bcrypt

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-coaching
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Configure Tailwind (tailwind.config.js):
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Start the frontend:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/role/:role` - Get users by role
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get system statistics

### Coach Routes
- `POST /api/coach/plans` - Create training plan
- `GET /api/coach/plans` - Get coach's plans
- `GET /api/coach/plans/:id` - Get single plan
- `PUT /api/coach/plans/:id` - Update plan
- `DELETE /api/coach/plans/:id` - Delete plan
- `GET /api/coach/athletes` - Get coach's athletes
- `GET /api/coach/athletes/:athleteId/progress` - Get athlete progress

### Athlete Routes
- `GET /api/athlete/plans` - Get assigned plans
- `POST /api/athlete/workouts` - Log workout
- `GET /api/athlete/workouts` - Get workouts
- `PUT /api/athlete/workouts/:id` - Update workout
- `POST /api/athlete/performance` - Log performance
- `GET /api/athlete/performance` - Get performance history
- `POST /api/athlete/feedback` - Submit feedback
- `GET /api/athlete/feedback` - Get feedback

## Default User Roles

The system supports three user roles:
- **admin**: Full system access
- **coach**: Create plans, manage athletes
- **athlete**: View plans, log workouts

## Project Structure

```
smart-coaching-planner/
├── backend/
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & validation middleware
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   ├── utils/       # Utility functions
│   │   └── App.js       # Main app component
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Shubham Jadhav

## Acknowledgments

- Cravita Technologies for the technical task specification
- MERN stack community for excellent documentation
