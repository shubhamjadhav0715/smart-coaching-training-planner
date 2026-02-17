# AthleteIQ - Smart Coaching & Training Platform

<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/8b01e49c-7663-41d5-be6b-69457761b496" />

## Introduction

**AthleteIQ** is an intelligent web-based sports management application developed using the MERN stack that helps coaches plan, monitor, and optimize athlete training programs. Instead of using manual training charts and verbal instructions, coaches can create personalized training schedules, assign drills, and track player performance digitally. Athletes can log their daily workouts, view assigned plans, and provide feedback, enabling data-driven coaching and performance improvement.

## Technology Stack

- **Frontend:** React.js (interactive dashboards for coaches and athletes)
- **Backend:** Node.js with Express.js (training logic and REST APIs)
- **Database:** MongoDB (training plans, performance logs, user data)
- **Authentication:** JWT & bcrypt (secure role-based access)

## Key Modules & Features

### 1. Admin Module
- Manage coaches, athletes, and sports categories
- Monitor overall training activity and system usage
- Generate performance and participation reports

### 2. Coach Module
- Create customized training plans (strength, endurance, skills)
- Assign workouts and drills to individual athletes or teams
- Track athlete progress using performance metrics and graphs
- Provide feedback and adjust training plans accordingly
- Send automated email notifications to athletes
- Download comprehensive PDF training reports

### 3. Athlete Module
- Secure login to view assigned training schedules
- Log daily workouts and performance data
- Track progress and improvement history
- Submit feedback on training difficulty and fatigue levels
- View detailed analytics and performance trends
- Download personal training reports

## Additional Features

- **Progress visualization** using charts and analytics
- **Training reminders** via email notifications
- **Injury prevention** tracking and rest-day planning
- **Export training reports** in PDF format
- **Mobile-friendly** design for on-field access
- **Real-time analytics** for performance tracking
- **Automated notifications** for plan assignments and feedback

## How to Run

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup

1. Navigate to backend folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```bash
cp .env.example .env
```

4. Edit .env file with your MongoDB connection string

5. Create admin user (first time only)
```bash
npm run seed:admin
```

6. Start backend server
```bash
npm run dev
```

Backend will run on: http://localhost:5000

### Frontend Setup

1. Open new terminal and navigate to frontend folder
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start frontend
```bash
npm start
```

Frontend will run on: http://localhost:3000

### Access the Application

Open browser and go to: http://localhost:3000

**Default Admin Credentials:**
```
Email: admin@athleteiq.com
Password: admin123
```

⚠️ **Change password after first login!**

## 📚 Documentation

- **Quick Start Guide:** See `QUICK_START.md`
- **Complete Setup Guide:** See `SETUP_GUIDE.md`
- **API Documentation:** See `API_DOCUMENTATION.md`
- **Bug Fixes & Features:** See `BUGFIXES.md`

## Screenshots

1. **Dashboard Overview**
<img width="1919" height="1020" alt="image" src="https://github.com/user-attachments/assets/b41609a1-293d-4013-a4f7-d47c50ab689b" />

2. **Training Plans**
<img width="1919" height="911" alt="Screenshot 2025-12-27 135032" src="https://github.com/user-attachments/assets/febee724-4117-49c2-92e2-8c4805def030" />

3. **Performance Tracking**
<img width="1919" height="1035" alt="Screenshot 2025-12-27 135125" src="https://github.com/user-attachments/assets/37e3fc60-b655-419f-bcb9-a9bd7f66f8cb" />

4. **Athlete Progress**
<img width="1919" height="1012" alt="Screenshot 2025-12-27 135057" src="https://github.com/user-attachments/assets/fff7eb08-06b4-40b2-bc77-e1a9238e40d8" />

## Conclusion

**AthleteIQ** provides a structured, digital approach to sports training management. By leveraging the MERN stack and intelligent analytics, it enhances communication between coaches and athletes, supports data-driven decisions, and helps improve athletic performance through organized training and progress tracking.

---
Email: admin@athleteiq.com
Password: admin123

**Built with ❤️ using the MERN Stack**
