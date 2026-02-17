# AthleteIQ - Smart Coaching & Training Platform

<div align="center">

![AthleteIQ Banner](https://github.com/user-attachments/assets/8b01e49c-7663-41d5-be6b-69457761b496)

**Intelligent web-based sports management platform for coaches and athletes**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4+-green.svg)](https://www.mongodb.com/)

[Features](#-features) • [Tech Stack](#-technology-stack) • [Installation](#-installation) • [Documentation](#-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📖 About

**AthleteIQ** transforms traditional sports coaching by providing a comprehensive digital platform for training management. Coaches can create personalized training schedules, assign drills, and track athlete performance with data-driven insights. Athletes can log workouts, view assigned plans, and provide feedback—all in one intelligent system.

### Why AthleteIQ?

- 🎯 **Data-Driven Coaching** - Make informed decisions based on performance analytics
- 📊 **Real-Time Tracking** - Monitor athlete progress with live dashboards
- 📱 **Mobile-Friendly** - Access training plans anywhere, anytime
- 🔔 **Smart Notifications** - Automated reminders and updates via email
- 📈 **Performance Analytics** - Visualize progress with charts and reports
- 📄 **PDF Reports** - Export comprehensive training summaries

---

## ✨ Features

### 👨‍💼 Admin Module
- Manage coaches, athletes, and sports categories
- Monitor overall training activity and system usage
- Generate performance and participation reports
- User role management and access control

### 🏋️ Coach Module
- Create customized training plans (strength, endurance, skills)
- Assign workouts and drills to individual athletes or teams
- Track athlete progress using performance metrics and graphs
- Provide feedback and adjust training plans dynamically
- Send automated email notifications to athletes
- Download comprehensive PDF training reports

### 🏃 Athlete Module
- Secure login to view assigned training schedules
- Log daily workouts and performance data
- Track progress and improvement history
- Submit feedback on training difficulty and fatigue levels
- View detailed analytics and performance trends
- Download personal training reports

### 🚀 Additional Features
- **Progress Visualization** - Interactive charts and analytics
- **Training Reminders** - Automated email notifications
- **Injury Prevention** - Rest-day planning and tracking
- **Export Reports** - PDF format for offline access
- **Real-Time Analytics** - Live performance tracking
- **Responsive Design** - Optimized for all devices

---

## 🛠 Technology Stack

### Frontend
- **React.js** - Interactive user interfaces
- **Tailwind CSS** - Modern, responsive styling
- **Recharts** - Data visualization and analytics
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Security & Authentication
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting

### Additional Tools
- **Nodemailer** - Email notifications
- **PDFKit** - PDF report generation
- **Express Validator** - Input validation

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/shubhamjadhav0715/athleteiq.git
cd athleteiq
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/athleteiq
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Create Admin User:**
```bash
npm run seed:admin
```

**Start Backend Server:**
```bash
npm run dev
```
✅ Backend running on: `http://localhost:5000`

#### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```
✅ Frontend running on: `http://localhost:3000`

### 🔑 Default Credentials

**Admin Account:**
```
Email:    admin@athleteiq.com
Password: admin123
```

⚠️ **IMPORTANT:** Change the password after first login!

---

## 📚 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation instructions
- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Sample Data Guide](SAMPLE_DATA_GUIDE.md)** - Testing with sample data

---

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://github.com/user-attachments/assets/b41609a1-293d-4013-a4f7-d47c50ab689b)

### Training Plans
![Training Plans](https://github.com/user-attachments/assets/febee724-4117-49c2-92e2-8c4805def030)

### Performance Tracking
![Performance](https://github.com/user-attachments/assets/37e3fc60-b655-419f-bcb9-a9bd7f66f8cb)

### Athlete Progress
![Progress](https://github.com/user-attachments/assets/fff7eb08-06b4-40b2-bc77-e1a9238e40d8)

---

## 🗂 Project Structure

```
athleteiq/
├── backend/
│   ├── config/          # Database and configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Authentication & validation
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions (email, PDF)
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.js       # Main app component
│   └── package.json
└── README.md
```

---

## 🔧 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed:admin # Create admin user
npm run seed:data  # Load sample data
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Admin
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user

### Coach
- `POST /api/coach/plans` - Create training plan
- `GET /api/coach/plans` - Get all plans
- `PUT /api/coach/plans/:id` - Update plan
- `DELETE /api/coach/plans/:id` - Delete plan

### Athlete
- `GET /api/athlete/plans` - Get assigned plans
- `POST /api/athlete/workouts` - Log workout
- `GET /api/athlete/analytics` - Get performance analytics

For complete API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shubham Jadhav**

- GitHub: [@shubhamjadhav0715](https://github.com/shubhamjadhav0715)
- Email: itsmeshubzz07@gmail.com

---

## 🙏 Acknowledgments

- Built with the MERN Stack
- Icons and UI components from Tailwind CSS
- Charts powered by Recharts
- Email service by Nodemailer

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Setup Guide](SETUP_GUIDE.md)
2. Review [API Documentation](API_DOCUMENTATION.md)
3. Open an issue on GitHub
4. Contact: itsmeshubzz07@gmail.com

---

<div align="center">

**Built with ❤️ using the MERN Stack**

⭐ Star this repository if you find it helpful!

</div>
