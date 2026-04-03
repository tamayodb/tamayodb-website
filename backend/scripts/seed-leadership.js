require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const LeadershipModel = require('../models/Leadership.js'); 

const leadershipData = [ 
  {
    organization: "Python Philippines",
    role: "Kaizend Core Member",
    dateRange: "August 2025 - Present",
    responsibilities: [
      "Facilitates monthly technical meetups for over 80 industry professionals and students to foster networking and knowledge exchange",
    ],
    url: "", 
    isCurrent: true,
    order: 1,
  },
  {
    organization: "Python Philippines 2026 - Annual Conference",
    role: "Python Asia 2026 Logistics Committee Lead",
    dateRange: "August 2025 - Present",
    responsibilities: [
      "Managed a strategic partnership while working closely with De La Salle University to co-organize the region's largest Python conference",
      "Oversee the operational framework for over 700 international attendees."
    ],
    url: "", 
    isCurrent: true,
    order: 2,
  },
  {
    organization: "Google Developer Group Cloud Manila",
    role: "Logistics Core Volunteer",
    dateRange: "September 2024 - Present",
    responsibilities: [
      "Orchestrated logistics for DevFest 2024 and 2025, successfully managing onsite operations for over 100 attendees.",
    ],
    url: "", 
    isCurrent: true,
    order: 3,
  },
  {
    organization: "FlutterFlow Developer Group Manila",
    role: "Core Volunteer",
    dateRange: "October 2024 - Present",
    responsibilities: [
      "Organized a tech community meetup with 80+ attendees, fostering networking and knowledge-sharing opportunities.",
      "Coordinated a 2-day FlutterFlow hackathon with 100 participants, managing event logistics, scheduling, and participant engagement."
    ],
    url: "", 
    isCurrent: true,
    order: 4,
  },
  {
    organization: "Google Developer Group on Campus - NU Manila A.Y 2024-2025",
    role: "Chief Operations Officer",
    dateRange: "August 2024 - August 2025",
    responsibilities: [
      "Led and managed operational activities for 10 projects and events, fostering growth opportunities for 144 members.",
      "Directed a 14-member committee, overseeing logistics, planning, and execution of all organization-wide events."
    ],
    url: "", 
    isCurrent: false,
    order: 5,
  },
  {
    organization: "NU College of Computing and Information Technology Student Council",
    role: "Events Creation and Technical Production Member",
    dateRange: "August 2024 - August 2025",
    responsibilities: [
      "Assisted in planning and managing event logistics and technical production for college-wide activities.",
    ],
    url: "", 
    isCurrent: false,
    order: 6,
  },
  {
    organization: "Python Philippines 2025 - Annual Conference",
    role: "Swags Committee & Logistics Committee Volunteer",
    dateRange: "November 2024 - April 2025",
    responsibilities: [
      "Managed the production and distribution of 500+ swags for attendees at PyCon APAC 2025.",
      "Assisted in logistics planning for a 3-day event, coordinating venue setup, materials distribution, and attendee flow for 500+ participants."
    ],
    url: "", 
    isCurrent: false,
    order: 7,
  },
  {
    organization: "ASEAN Data Science Explorers Enablement Session",
    role: "Swags Committee & Logistics Committee Volunteer",
    dateRange: "November 2024 - April 2025",
    responsibilities: [
      "Managed the production and distribution of 500+ swags for attendees at PyCon APAC 2025.",
      "Assisted in logistics planning for a 3-day event, coordinating venue setup, materials distribution, and attendee flow for 500+ participants."
    ],
    url: "", 
    isCurrent: false,
    order: 8,
  },
];  

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await LeadershipModel.deleteMany({});
    console.log('Cleared existing leadership experiences');

    await LeadershipModel.insertMany(leadershipData);
    console.log(`Inserted ${leadershipData.length} leadership experiences`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();