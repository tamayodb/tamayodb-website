require('dotenv').config();
const mongoose = require('mongoose');
const Certification = require('../models/Certification.js');

const certifications = [
  { date: "02/2026", title: "HTML, CSS, and Javascript for Web Developers", provider: "Coursera-Johns Hopkins University", url: "", order: 1 },
  { date: "12/2023", title: "Data Scientist", provider: "DAP-Project SPARTA", url: "", order: 2 },
  { date: "11/2023", title: "Data Scientist Capstone Course", provider: "DAP-Project SPARTA", url: "", order: 3 },
  { date: "11/2023", title: "Data Science and Machine Learning Using Python", provider: "DAP-Project SPARTA", url: "", order: 4 },
  { date: "11/2023", title: "Computing", provider: "DAP-Project SPARTA", url: "", order: 5 },
  { date: "11/2023", title: "Methods and Algorithms", provider: "DAP-Project SPARTA", url: "", order: 6 },
  { date: "11/2023", title: "Statistical Techniques", provider: "DAP-Project SPARTA", url: "", order: 7 },
  { date: "10/2023", title: "Statistical Analysis and Modeling Using Excel", provider: "DAP-Project SPARTA", url: "", order: 8 },
  { date: "10/2023", title: "Research Methods", provider: "DAP-Project SPARTA", url: "", order: 9 },
  { date: "10/2023", title: "Python for Data Engineering", provider: "DAP-Project SPARTA", url: "", order: 10 },
  { date: "10/2023", title: "Statistical Analysis and Modeling Using SQL and Python", provider: "DAP-Project SPARTA", url: "", order: 11 },
  { date: "10/2023", title: "Data Visualization", provider: "DAP-Project SPARTA", url: "", order: 12 },
  { date: "09/2023", title: "Storytelling Using Data", provider: "DAP-Project SPARTA", url: "", order: 13 },
  { date: "09/2023", title: "Data Visualization Using Tableau and Python", provider: "DAP-Project SPARTA", url: "", order: 14 },
  { date: "09/2023", title: "Experimental Design and Analysis", provider: "DAP-Project SPARTA", url: "", order: 15 },
  { date: "08/2023", title: "Data Visualization Fundamentals", provider: "DAP-Project SPARTA", url: "", order: 16 },
  { date: "08/2023", title: "Data-Driven Research Fundamentals", provider: "DAP-Project SPARTA", url: "", order: 17 },
  { date: "08/2023", title: "Computing in Python", provider: "DAP-Project SPARTA", url: "", order: 18 },
  { date: "08/2023", title: "SQL for Business Users", provider: "DAP-Project SPARTA", url: "", order: 19 },
  { date: "08/2023", title: "Dashboards and Drill-Down Analytics", provider: "DAP-Project SPARTA", url: "", order: 20 },
  { date: "07/2023", title: "Essential Excel Skills for Data Preparation and Analysis", provider: "DAP-Project SPARTA", url: "", order: 21 },
  { date: "07/2023", title: "Analytics Applications in Finance and Risk", provider: "DAP-Project SPARTA", url: "", order: 22 },
  { date: "07/2023", title: "Design Thinking for Analytics", provider: "DAP-Project SPARTA", url: "", order: 23 },
  { date: "07/2023", title: "Share Data Through the Art of Visualization", provider: "Coursera-Google", url: "", order: 24 },
  { date: "07/2023", title: "Google Data Analytics Capstone: Complete a Case Study", provider: "Coursera-Google", url: "", order: 25 },
  { date: "07/2023", title: "Foundations: Data, Data, Everywhere", provider: "Coursera-Google", url: "", order: 26 },
  { date: "07/2023", title: "Data Analysis with R Programming", provider: "Coursera-Google", url: "", order: 27 },
  { date: "07/2023", title: "Analyze Data to Answer Questions", provider: "Coursera-Google", url: "", order: 28 },
  { date: "07/2023", title: "Google Data Analytics", provider: "Coursera-Google", url: "", order: 29 },
  { date: "06/2023", title: "Getting Grounded on Analytics", provider: "DAP-Project SPARTA", url: "", order: 30 },
  { date: "06/2023", title: "Process Data from Dirty to Clean", provider: "Coursera-Google", url: "", order: 31 },
  { date: "05/2023", title: "Prepare Data for Exploration", provider: "Coursera-Google", url: "", order: 32 },
  { date: "11/2022", title: "Ask Questions to Make Data-Driven Decisions", provider: "Coursera-Google", url: "", order: 33 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Certification.deleteMany({});
    console.log('Cleared existing certifications');

    await Certification.insertMany(certifications);
    console.log(`Inserted ${certifications.length} certifications`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();