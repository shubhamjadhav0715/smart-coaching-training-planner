# 🎯 Sample Data Guide - AthleteIQ

## 📊 **Load Sample Data for Testing**

---

## **Quick Start**

### **Step 1: Stop Your Backend Server**
Press `Ctrl + C` in the backend terminal

### **Step 2: Run Sample Data Seeder**
```bash
# Make sure you're in the backend folder
cd C:\Users\itsme\Desktop\athleteiq\backend

# Run the seeder
node seedSampleData.js
```

### **Step 3: Restart Backend**
```bash
npm start
```

### **Step 4: Refresh Your Browser**
Press `F5` or refresh the page

---

## 🔐 **Test Accounts**

### **👨‍💼 ADMIN**
```
Email: admin@athleteiq.com
Password: admin123
```

### **👨‍🏫 COACHES (All password: coach123)**

#### 1. John Smith - Football Coach
```
Email: john.coach@athleteiq.com
Password: coach123
Sport: Football
Athletes: Alex Martinez, James Wilson
```

#### 2. Sarah Johnson - Basketball Coach
```
Email: sarah.coach@athleteiq.com
Password: coach123
Sport: Basketball
Athletes: Emma Davis, Liam Taylor
```

#### 3. Mike Williams - Swimming Coach
```
Email: mike.coach@athleteiq.com
Password: coach123
Sport: Swimming
Athletes: Olivia Brown, Sophia Anderson
```

### **🏃 ATHLETES (All password: athlete123)**

#### 1. Alex Martinez - Football
```
Email: alex.athlete@athleteiq.com
Password: athlete123
Coach: John Smith
Training Plans: 2 active plans
Workouts: 7+ logged workouts
```

#### 2. Emma Davis - Basketball
```
Email: emma.athlete@athleteiq.com
Password: athlete123
Coach: Sarah Johnson
Training Plans: 2 active plans
Workouts: 5+ logged workouts
```

#### 3. James Wilson - Football
```
Email: james.athlete@athleteiq.com
Password: athlete123
Coach: John Smith
Training Plans: 1 active plan
Workouts: 7+ logged workouts
```

#### 4. Olivia Brown - Swimming
```
Email: olivia.athlete@athleteiq.com
Password: athlete123
Coach: Mike Williams
Training Plans: 1 active plan
Workouts: 7+ logged workouts
```

#### 5. Liam Taylor - Basketball
```
Email: liam.athlete@athleteiq.com
Password: athlete123
Coach: Sarah Johnson
Training Plans: 1 active plan
Workouts: 0 workouts (new athlete)
```

#### 6. Sophia Anderson - Swimming
```
Email: sophia.athlete@athleteiq.com
Password: athlete123
Coach: Mike Williams
Training Plans: 1 active plan
Workouts: 0 workouts (new athlete)
```

---

## 📋 **Sample Training Plans**

### **1. Football Strength & Conditioning**
- **Coach:** John Smith
- **Athletes:** Alex Martinez, James Wilson
- **Duration:** 8 weeks, 4 sessions/week
- **Category:** Strength
- **Status:** Active

### **2. Basketball Agility Training**
- **Coach:** Sarah Johnson
- **Athletes:** Emma Davis, Liam Taylor
- **Duration:** 6 weeks, 5 sessions/week
- **Category:** Agility
- **Status:** Active

### **3. Swimming Endurance Program**
- **Coach:** Mike Williams
- **Athletes:** Olivia Brown, Sophia Anderson
- **Duration:** 10 weeks, 6 sessions/week
- **Category:** Endurance
- **Status:** Active

### **4. Speed Development - Football**
- **Coach:** John Smith
- **Athletes:** Alex Martinez
- **Duration:** 4 weeks, 3 sessions/week
- **Category:** Speed
- **Status:** Active

### **5. Basketball Skills Mastery**
- **Coach:** Sarah Johnson
- **Athletes:** Emma Davis
- **Duration:** 12 weeks, 4 sessions/week
- **Category:** Skills
- **Status:** Active

---

## 💪 **Sample Workouts**

The seeder creates **50+ workout logs** for the past 2 weeks:

- **Alex Martinez:** 7 workouts (Football strength training)
- **Emma Davis:** 5 workouts (Basketball agility)
- **James Wilson:** 7 workouts (Football conditioning)
- **Olivia Brown:** 7 workouts (Swimming endurance)
- **Liam & Sophia:** 0 workouts (new athletes - you can test logging)

Each workout includes:
- Duration (55-120 minutes)
- Calories burned (380-700)
- Difficulty rating (5-10)
- Fatigue level (4-9)
- Mood (excellent/good/average)
- Notes

---

## 📊 **Sample Performance Data**

Performance records for the past month (weekly):

### **Alex Martinez (Football)**
- Weight: 75 kg → 73 kg
- Body Fat: 15% → 13.5%
- Muscle Mass: 60 kg → 62 kg
- Bench Press: 80 kg → 90 kg
- Squat: 100 kg → 115 kg
- VO2 Max: 45 → 48

### **Emma Davis (Basketball)**
- Weight: 65 kg → 63.5 kg
- Body Fat: 18% → 17%
- Muscle Mass: 50 kg → 51.5 kg
- Bench Press: 50 kg → 57.5 kg
- Squat: 70 kg → 80 kg
- VO2 Max: 48 → 51

---

## 💬 **Sample Feedback**

4 feedback messages between athletes and coaches:

1. **Alex → John:** About recovery time (Responded)
2. **Emma → Sarah:** Positive feedback on drills (Responded)
3. **Olivia → Mike:** Progress update (Pending)
4. **James → John:** Form guidance request (Responded)

---

## 🎯 **Testing Scenarios**

### **As Admin:**
1. Login as admin
2. View dashboard stats (should show 3 coaches, 6 athletes)
3. View all users
4. Delete a user (test functionality)

### **As Coach (John Smith):**
1. Login: john.coach@athleteiq.com / coach123
2. View your training plans (2 plans)
3. View your athletes (Alex, James)
4. Create a new training plan
5. View athlete progress
6. Respond to feedback

### **As Athlete (Alex Martinez):**
1. Login: alex.athlete@athleteiq.com / athlete123
2. View your training plans (2 active plans)
3. View your workout history (7 workouts)
4. Log a new workout
5. View your analytics/progress
6. Send feedback to coach
7. Download PDF report

### **As New Athlete (Liam Taylor):**
1. Login: liam.athlete@athleteiq.com / athlete123
2. View assigned plan (1 plan)
3. Log your first workout
4. Start building your history

---

## 📈 **What You Can Test**

### **Admin Features:**
- [ ] View system statistics
- [ ] Manage users (view, delete)
- [ ] Monitor overall activity
- [ ] View all training plans

### **Coach Features:**
- [ ] View assigned athletes
- [ ] Create training plans
- [ ] Assign plans to athletes
- [ ] View athlete progress
- [ ] Respond to feedback
- [ ] Download reports

### **Athlete Features:**
- [ ] View assigned training plans
- [ ] Log workouts
- [ ] Track performance metrics
- [ ] View analytics and graphs
- [ ] Send feedback to coach
- [ ] Download personal reports

---

## 🔄 **Reset Sample Data**

To reset and reload sample data:

```bash
# Stop backend (Ctrl + C)

# Run seeder again
node seedSampleData.js

# Restart backend
npm start
```

**Note:** This will delete all existing data except the admin account!

---

## 📊 **Data Summary**

After running the seeder, you'll have:

- ✅ **1 Admin** account
- ✅ **3 Coaches** (Football, Basketball, Swimming)
- ✅ **6 Athletes** (2 per sport)
- ✅ **5 Training Plans** (active)
- ✅ **50+ Workout Logs** (past 2 weeks)
- ✅ **10 Performance Records** (weekly data)
- ✅ **4 Feedback Messages** (with responses)

---

## 🎨 **Realistic Data**

All sample data is realistic and includes:

- Progressive performance improvements
- Varied workout intensities
- Different mood states
- Realistic metrics (weight, strength, endurance)
- Coach-athlete interactions
- Multiple sports categories

---

## 💡 **Tips for Testing**

1. **Start with Admin** - See the big picture
2. **Login as Coach** - Create and manage plans
3. **Login as Athlete** - Experience the athlete journey
4. **Test All Features** - Workouts, feedback, analytics
5. **Check Analytics** - View progress graphs
6. **Download Reports** - Test PDF generation

---

## 🆘 **Troubleshooting**

### **Seeder fails:**
```bash
# Make sure backend is stopped
# Check MongoDB is running
# Check .env file exists
```

### **No data showing:**
```bash
# Refresh browser (F5)
# Clear browser cache
# Re-run seeder
```

### **Login fails:**
```bash
# Double-check email and password
# Make sure you're using the correct account type
# All passwords are lowercase (coach123, athlete123)
```

---

## 📚 **Next Steps**

After loading sample data:

1. **Explore as Admin** - See system overview
2. **Test Coach Workflow** - Create plans, manage athletes
3. **Test Athlete Workflow** - Log workouts, track progress
4. **Test Analytics** - View performance graphs
5. **Test Reports** - Download PDF reports
6. **Test Feedback** - Coach-athlete communication

---

**🎉 Enjoy testing with realistic sample data!**

**© 2026 AthleteIQ - Smart Coaching Platform** 🏆
