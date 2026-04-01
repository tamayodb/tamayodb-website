require('dotenv').config();
const mongoose = require('mongoose');
const Achievement = require('../models/Achievement.js');

const achievements = [
  {
    title: "ICICT 2026 Honolulu, Hawaii",
    date: "March 2026",
    award: "Accepted Conference Paper & Presenter",
    awardType: "special",
    description: [
      "Authored research on an Explainable Clustering Framework for Post-Tropical Cyclone Impact Profiling ",
      "Developed optimized clustering models (K-Means, DBSCAN, GMM, Agglomerative) using Optuna and PCA ",
      "Integrated the MAACLI framework for explainability in disaster severity tiers ",
    ],
    url: "", 
    order: 1,
  },
  {
    title: "UP SoComSci Techatlon 2024",
    date: "Nov 2024",
    award: "Champion",
    awardType: "winner",
    description: [
      "UI/UX Designer for 'BlogBite', a blockchain-based platform for food content creators ",
      "Ideated a user-centric solution to resolve restaurant discovery through reputable reviews ",
      "Created high-fidelity Figma prototypes showcasing seamless social media integration ",
    ],
    url: "", 
    order: 2,
  },
  {
    title: "InnOlympics 2025",
    date: "Jan 2025",
    award: "Best App Idea for Digital Tools for Governance and Transparency",
    awardType: "special",
    description: [
      "Lead Developer for 'TalaBatas', a mobile MVP for public order and transparency ",
      "Integrated Gemini API and FlutterFlow to build an intelligent governance tool ",
      "Recognized for innovation in digital tools at the hackathon held at ING Hubs Philippines ",
    ],
    url: "", 
    order: 3,
  },
  {
    title: "Google Tech: The Google Solution Challenge Ideathon",
    date: "July 2024",
    award: "First Runner Up",
    awardType: "winner",
    description: [
      "UI/UX Designer for 'Diabetease', an application for patient-centric diabetes management ",
      "Leveraged Google Cloud Platform principles to ideate scalable health-tech solutions",
      "Developed comprehensive user flows and design systems to improve patient accessibility ",
    ],
    url: "", 
    order: 4,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Achievement.deleteMany({});
    console.log('Cleared existing achievements');

    await Achievement.insertMany(achievements);
    console.log(`Inserted ${achievements.length} achievements`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();