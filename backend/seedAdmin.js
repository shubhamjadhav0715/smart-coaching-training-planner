const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'admin@athleteiq.com' });

    if (adminExists) {
      console.log('❌ Admin user already exists!');
      console.log('Email: admin@athleteiq.com');
      process.exit(0);
    }

    const admin = await User.create({
      name: 'AthleteIQ Admin',
      email: 'admin@athleteiq.com',
      password: 'admin123',
      role: 'admin',
      phone: '1234567890',
      isActive: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('==========================================');
    console.log('Email: admin@athleteiq.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('==========================================');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('');
    console.log('🎉 Welcome to AthleteIQ - Smart Coaching Platform');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
