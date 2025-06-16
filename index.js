const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Generic helper to fetch any collection
const getCollectionData = async (collectionName, res) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    res.status(500).send(`Error fetching ${collectionName}: ${error.message}`);
  }
};

// Users
app.get('/api/users', (req, res) => getCollectionData('users', res));

// FoodReward
app.get('/api/food-reward', (req, res) => getCollectionData('FoodReward', res));

// Activity Log
app.get('/api/activity-log', (req, res) => getCollectionData('activityLog', res));

// Bottles
app.get('/api/bottles', (req, res) => getCollectionData('bottles', res));

// Dashboard
app.get('/api/dashboard', (req, res) => getCollectionData('dashboard', res));

// Notifications
app.get('/api/notifications', (req, res) => getCollectionData('notifications', res));

// Default message
app.get('/', (req, res) => {
  res.send('🔥 Firestore API is running');
});

// Server
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
