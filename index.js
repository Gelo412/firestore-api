const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Initialize Firebase Admin with credentials from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ GET all users
app.get('/api/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
});

// ✅ GET all FoodReward entries
app.get('/api/food-rewards', async (req, res) => {
  try {
    const snapshot = await db.collection('FoodReward').get();
    const rewards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(rewards);
  } catch (error) {
    res.status(500).send('Error fetching food rewards: ' + error.message);
  }
});

// ✅ GET all activity logs
app.get('/api/activity-logs', async (req, res) => {
  try {
    const snapshot = await db.collection('activityLog').get();
    const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(logs);
  } catch (error) {
    res.status(500).send('Error fetching activity logs: ' + error.message);
  }
});

// ✅ GET all bottles
app.get('/api/bottles', async (req, res) => {
  try {
    const snapshot = await db.collection('bottles').get();
    const bottles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(bottles);
  } catch (error) {
    res.status(500).send('Error fetching bottles: ' + error.message);
  }
});

// ✅ GET dashboard data
app.get('/api/dashboard', async (req, res) => {
  try {
    const snapshot = await db.collection('dashboard').get();
    const dashboard = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(dashboard);
  } catch (error) {
    res.status(500).send('Error fetching dashboard: ' + error.message);
  }
});

// ✅ GET notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const snapshot = await db.collection('notifications').get();
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(notifications);
  } catch (error) {
    res.status(500).send('Error fetching notifications: ' + error.message);
  }
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🎉 Firestore API is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
