const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Listing = require('../models/Listing');

const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const usersData = [
  {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@rvu.edu.in',
    password: 'password123',
    campus: 'RV University, Bengaluru',
    role: 'student',
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.iyer@rvu.edu.in',
    password: 'password123',
    campus: 'RV University, Bengaluru',
    role: 'student',
  },
  {
    name: 'Vikram Mehta',
    email: 'vikram.mehta@rvu.edu.in',
    password: 'password123',
    campus: 'PES University, Bengaluru',
    role: 'student',
  },
  {
    name: 'Sneha Patel',
    email: 'sneha.patel@rvu.edu.in',
    password: 'password123',
    campus: 'BMS College of Engineering',
    role: 'student',
  },
];

const listingsData = [
  {
    title: 'Casio FX-991EX ClassWiz Scientific Calculator',
    description: 'Original Casio ClassWiz calculator in excellent working condition with protective slide-on cover. Perfect for engineering mathematics, physics, and university semester exams.',
    price: 750,
    category: 'Calculators',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
    campus: 'RV University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Higher Engineering Mathematics by B.S. Grewal (44th Ed)',
    description: 'Standard textbook for Semester 1 and 2 engineering calculus, matrices, and differential equations. No missing pages, minimal pencil markings inside.',
    price: 450,
    category: 'Books',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    campus: 'RV University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Data Structures and Algorithms in C++ (Kanetkar)',
    description: 'Comprehensive guide covering linked lists, trees, graphs, sorting, and dynamic programming with solved interview problems.',
    price: 380,
    category: 'Books',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80',
    campus: 'PES University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Arduino Uno R3 Ultimate Starter Kit with 30+ Sensors',
    description: 'Complete IoT & electronics lab kit including Arduino Uno, ultrasonic sensor, LCD module, breadboard, jumper wires, servo motor, and resistor pack.',
    price: 1200,
    category: 'Electronics',
    condition: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=80',
    campus: 'BMS College of Engineering',
    status: 'available',
  },
  {
    title: '100% Pure Cotton Lab Coat (White, Size L)',
    description: 'Standard unisex white laboratory coat required for chemistry, biology, and materials science lab sessions. Clean and freshly washed.',
    price: 280,
    category: 'Lab Equipment',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    campus: 'RV University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Engineering Mini Drafter with Sheet Clips & Scale Set',
    description: 'Omega mini drafter for engineering graphics with precision rotating arm, drafting sheet clips, set squares, and drawing tube canister.',
    price: 650,
    category: 'Lab Equipment',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    campus: 'RV University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Ergonomic Mesh Study Chair with Armrests',
    description: 'Comfortable breathable mesh chair with adjustable height and lumbar support. Ideal for hostel rooms and long coding study sessions.',
    price: 1850,
    category: 'Furniture',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1580481077197-987823b7493a?w=600&auto=format&fit=crop&q=80',
    campus: 'PES University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Mechanical Gaming & Typing Keyboard (Blue Switches)',
    description: 'Compact 87-key tactile mechanical keyboard with customizable RGB backlighting and detachable braided USB-C cable.',
    price: 1100,
    category: 'Electronics',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    campus: 'BMS College of Engineering',
    status: 'available',
  },
  {
    title: 'Texas Instruments TI-84 Plus Graphing Calculator',
    description: 'Pre-loaded with calculus, statistics, and matrix manipulation software. High-contrast screen with rechargeable battery pack.',
    price: 3200,
    category: 'Calculators',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
    campus: 'RV University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Classmate Premium Spiral Notebooks (Pack of 4)',
    description: 'Unused 300-page single ruled spiral notebooks with thick 70 GSM paper plus bonus highlighter pack.',
    price: 190,
    category: 'Stationery',
    condition: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&auto=format&fit=crop&q=80',
    campus: 'RV University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Digital Multimeter with Test Probes & 9V Battery',
    description: 'Compact digital multimeter for measuring AC/DC voltage, resistance, diode test, and continuity buzzer. Essential for hardware projects.',
    price: 420,
    category: 'Electronics',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
    campus: 'PES University, Bengaluru',
    status: 'available',
  },
  {
    title: 'Operating System Concepts (10th Edition - Silberschatz)',
    description: 'The definitive operating systems textbook covering processes, threads, CPU scheduling, synchronization, deadlocks, and virtual memory.',
    price: 550,
    category: 'Books',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    campus: 'RV University, Bengaluru',
    status: 'available',
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campuscart';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB at:', mongoUri);

    // Clear existing collections
    await User.deleteMany({});
    await Listing.deleteMany({});
    console.log('[Seed] Cleared existing Users and Listings.');

    // Create users (password hashed via pre-save hook)
    const createdUsers = [];
    for (const userData of usersData) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log(`[Seed] Created ${createdUsers.length} sample student accounts.`);

    // Distribute listings among created users
    const createdListings = [];
    for (let i = 0; i < listingsData.length; i++) {
      const assignedSeller = createdUsers[i % createdUsers.length];
      const listing = await Listing.create({
        ...listingsData[i],
        seller: assignedSeller._id,
      });
      createdListings.push(listing);
    }
    console.log(`[Seed] Successfully seeded ${createdListings.length} realistic campus listings!`);

    console.log('\n--- Sample Student Credentials for Testing ---');
    createdUsers.forEach((u) => {
      console.log(`Email: ${u.email} | Password: password123 | Campus: ${u.campus}`);
    });
    console.log('-----------------------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
