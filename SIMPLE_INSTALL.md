# 🚀 Simple Installation Guide - AthleteIQ

## ✅ **Step-by-Step Installation**

---

## **STEP 1: Install Required Software**

### 1.1 Install Node.js
- Go to: https://nodejs.org/
- Download **LTS version** (recommended)
- Install it (just click Next, Next, Finish)
- Verify installation:
```bash
node --version
npm --version
```

### 1.2 Install MongoDB
- Go to: https://www.mongodb.com/try/download/community
- Download **MongoDB Community Server**
- Install it (use default settings)
- MongoDB will start automatically

### 1.3 Install Git (if not installed)
- Go to: https://git-scm.com/downloads
- Download and install
- Verify:
```bash
git --version
```

---

## **STEP 2: Download the Project**

### Option A: Using Git (Recommended)
```bash
# Open terminal/command prompt
# Navigate to where you want the project
cd Desktop

# Clone the repository
git clone https://github.com/shubhamjadhav0715/athleteiq.git

# Go into the project folder
cd athleteiq
```

### Option B: Download ZIP
1. Go to: https://github.com/shubhamjadhav0715/athleteiq
2. Click green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file
5. Open terminal in that folder

---

## **STEP 3: Setup Backend**

```bash
# Go to backend folder
cd backend

# Install all packages (this will take 2-3 minutes)
npm install

# Create .env file
# For Windows:
copy .env.example .env

# For Mac/Linux:
cp .env.example .env
```

### Edit .env file:
Open `backend/.env` in any text editor and add:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/athleteiq
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## **STEP 4: Setup Frontend**

```bash
# Go back to main folder
cd ..

# Go to frontend folder
cd frontend

# Install all packages (this will take 2-3 minutes)
npm install
```

---

## **STEP 5: Create Admin User**

```bash
# Go back to backend folder
cd ../backend

# Run the seed script to create admin user
node seedAdmin.js
```

You should see:
```
✅ Admin user created successfully!
Email: admin@athleteiq.com
Password: admin123
```

---

## **STEP 6: Start the Application**

### Open TWO terminal windows:

### Terminal 1 - Start Backend:
```bash
# Make sure you're in backend folder
cd backend

# Start backend server
npm start
```

You should see:
```
🚀 AthleteIQ Server running on port 5000
✅ MongoDB Connected
📊 API Health Check: http://localhost:5000/api/health
```

### Terminal 2 - Start Frontend:
```bash
# Make sure you're in frontend folder
cd frontend

# Start frontend
npm start
```

Browser will automatically open at: http://localhost:3000

---

## **STEP 7: Login and Use**

### Login with Admin Account:
```
Email: admin@athleteiq.com
Password: admin123
```

### Or Create New Account:
1. Click "Register" on login page
2. Fill in your details
3. Choose role: Athlete or Coach
4. Click Register

---

## 📋 **Quick Command Reference**

### To Start Everything (After First Setup):

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### To Stop:
- Press `Ctrl + C` in both terminals

---

## 🔧 **Troubleshooting**

### Problem: "MongoDB connection failed"
**Solution:**
```bash
# Windows - Start MongoDB service
net start MongoDB

# Mac - Start MongoDB
brew services start mongodb-community

# Linux - Start MongoDB
sudo systemctl start mongod
```

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Problem: "Port 3000 already in use"
**Solution:**
- Frontend will ask: "Would you like to run on another port?"
- Type: `Y` and press Enter
- It will run on port 3001

### Problem: "npm install fails"
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

---

## 📁 **Project Structure**

```
athleteiq/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & validation
│   ├── utils/           # Helper functions
│   ├── server.js        # Main server file
│   ├── seedAdmin.js     # Create admin user
│   └── package.json
│
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── pages/       # All pages
│   │   ├── context/     # Auth context
│   │   ├── utils/       # API helper
│   │   └── App.js       # Main app
│   └── package.json
│
└── Documentation files
```

---

## ✅ **Verification Checklist**

After starting, verify everything works:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Can access login page
- [ ] Can login with admin@athleteiq.com / admin123
- [ ] Can register new user
- [ ] Dashboard loads properly
- [ ] No errors in terminal

---

## 🎯 **Default Accounts**

### Admin Account:
```
Email: admin@athleteiq.com
Password: admin123
Role: Admin
```

**⚠️ Change password after first login!**

---

## 📞 **Need Help?**

### Check these files in the project:
1. `README.md` - Main overview
2. `SETUP_GUIDE.md` - Detailed setup
3. `QUICK_START.md` - Quick reference
4. `API_DOCUMENTATION.md` - API details

### Common URLs:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health
- MongoDB: mongodb://localhost:27017

---

## 🎉 **You're All Set!**

Your AthleteIQ application is now running!

**Next Steps:**
1. Login with admin account
2. Create coach and athlete accounts
3. Create training plans
4. Log workouts
5. View analytics

---

## 📚 **Additional Documentation**

- **Complete Setup:** See `SETUP_GUIDE.md`
- **Quick Reference:** See `QUICK_START.md`
- **API Documentation:** See `API_DOCUMENTATION.md`
- **Branding Guide:** See `BRANDING.md`
- **Bug Fixes:** See `BUGFIXES.md`

---

**© 2026 AthleteIQ - Smart Coaching Platform** 🏆

**Enjoy your application!** 🚀
