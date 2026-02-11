require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await LostItem.deleteMany({});
    await FoundItem.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@college.edu',
      password: 'admin123',
      studentId: 'ADMIN001',
      phone: '9999999999',
      isAdmin: true
    });
    console.log('👤 Created admin user');

    // Create regular users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@college.edu',
      password: 'password123',
      studentId: 'STU001',
      phone: '9876543210'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@college.edu',
      password: 'password123',
      studentId: 'STU002',
      phone: '9876543211'
    });

    const user3 = await User.create({
      name: 'Mike Johnson',
      email: 'mike@college.edu',
      password: 'password123',
      studentId: 'STU003',
      phone: '9876543212'
    });

    console.log('👥 Created test users');

    // Create lost items
    const lostItems = await LostItem.create([
      {
        user: user1._id,
        category: 'Electronics',
        itemName: 'iPhone 13 Pro',
        description: 'Black iPhone 13 Pro with a cracked screen protector. Has a blue case.',
        color: 'Black',
        location: 'Library Reading Room',
        dateLost: new Date('2024-02-05'),
        timeLost: '14:30',
        verificationQuestions: [
          {
            question: 'What is the phone wallpaper?',
            answer: 'Mountain landscape'
          },
          {
            question: 'What apps are on the home screen?',
            answer: 'Instagram, WhatsApp, Canvas'
          }
        ],
        status: 'active'
      },
      {
        user: user2._id,
        category: 'Keys',
        itemName: 'Hostel Room Keys',
        description: 'Set of 3 keys on a red keychain with a small teddy bear.',
        color: 'Silver',
        location: 'Sports Complex',
        dateLost: new Date('2024-02-06'),
        timeLost: '17:00',
        verificationQuestions: [
          {
            question: 'What room number?',
            answer: '204'
          },
          {
            question: 'What is on the keychain?',
            answer: 'Teddy bear charm'
          }
        ],
        status: 'active'
      },
      {
        user: user3._id,
        category: 'Bags',
        itemName: 'Black Backpack',
        description: 'Nike black backpack with a small tear on the side pocket.',
        color: 'Black',
        location: 'Cafeteria',
        dateLost: new Date('2024-02-04'),
        timeLost: '13:00',
        verificationQuestions: [
          {
            question: 'What brand is the backpack?',
            answer: 'Nike'
          },
          {
            question: 'What was inside the bag?',
            answer: 'Laptop and textbooks'
          }
        ],
        status: 'active'
      },
      {
        user: user1._id,
        category: 'IDs',
        itemName: 'Student ID Card',
        description: 'College student ID card with photo.',
        color: 'Blue',
        location: 'Academic Block B',
        dateLost: new Date('2024-02-07'),
        timeLost: '10:00',
        verificationQuestions: [
          {
            question: 'What is your student ID number?',
            answer: 'STU001'
          }
        ],
        status: 'active'
      }
    ]);

    console.log('📦 Created lost items');

    // Create found items (some matching lost items)
    const foundItems = await FoundItem.create([
      {
        user: user2._id,
        category: 'Electronics',
        itemName: 'Black iPhone',
        description: 'Found a black iPhone with blue case near the reading area.',
        color: 'Black',
        location: 'Library Entrance',
        dateFound: new Date('2024-02-05'),
        timeFound: '16:00',
        currentLocation: 'Library Lost and Found Desk',
        status: 'available'
      },
      {
        user: user3._id,
        category: 'Keys',
        itemName: 'Keys with Keychain',
        description: 'Found keys with a red keychain.',
        color: 'Silver',
        location: 'Sports Ground',
        dateFound: new Date('2024-02-06'),
        timeFound: '18:30',
        currentLocation: 'Sports Complex Office',
        status: 'available'
      },
      {
        user: admin._id,
        category: 'Bags',
        itemName: 'Black Backpack',
        description: 'Black branded backpack found under a table.',
        color: 'Black',
        location: 'Food Court',
        dateFound: new Date('2024-02-04'),
        timeFound: '14:00',
        currentLocation: 'Security Office',
        status: 'available'
      },
      {
        isAnonymous: true,
        anonymousContact: 'anonymous@email.com',
        category: 'Books',
        itemName: 'Mathematics Textbook',
        description: 'Advanced Calculus textbook, 5th edition.',
        color: 'Red',
        location: 'Lecture Hall 3',
        dateFound: new Date('2024-02-06'),
        timeFound: '11:00',
        currentLocation: 'Academic Block Reception',
        status: 'available'
      },
      {
        user: user1._id,
        category: 'Accessories',
        itemName: 'Silver Watch',
        description: 'Silver wristwatch with leather strap.',
        color: 'Silver',
        location: 'Gymnasium',
        dateFound: new Date('2024-02-05'),
        timeFound: '19:00',
        currentLocation: 'Gym Reception',
        status: 'available'
      }
    ]);

    console.log('📦 Created found items');

    // Display created credentials
    console.log('\n' + '='.repeat(50));
    console.log('✅ DATABASE SEEDED SUCCESSFULLY');
    console.log('='.repeat(50));
    console.log('\n📝 Test Credentials:\n');
    console.log('Admin Account:');
    console.log('  Email: admin@college.edu');
    console.log('  Password: admin123\n');
    console.log('Test User Accounts:');
    console.log('  1. john@college.edu / password123');
    console.log('  2. jane@college.edu / password123');
    console.log('  3. mike@college.edu / password123\n');
    console.log('Database Stats:');
    console.log(`  👥 Users: ${await User.countDocuments()}`);
    console.log(`  📦 Lost Items: ${await LostItem.countDocuments()}`);
    console.log(`  📦 Found Items: ${await FoundItem.countDocuments()}`);
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run seed
connectDB().then(() => {
  seedData();
});
