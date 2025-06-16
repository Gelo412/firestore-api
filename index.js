const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Firestore API is running');
});

// Notifications
app.get('/notifications', async (req, res) => {
  try {
    const snapshot = await db.collection('notifications').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Dashboard - Example Summary Route
app.get('/dashboard', async (req, res) => {
  try {
    const bottlesSnap = await db.collection('bottles').get();
    const rewardsSnap = await db.collection('food-rewards').get();
    const usersSnap = await db.collection('users').get();

    res.json({
      totalBottles: bottlesSnap.size,
      totalRewards: rewardsSnap.size,
      totalUsers: usersSnap.size
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Bottles
app.get('/bottles', async (req, res) => {
  try {
    const snapshot = await db.collection('bottles').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Activity Logs
app.get('/activity-logs', async (req, res) => {
  try {
    const snapshot = await db.collection('activity-logs').orderBy('timestamp', 'desc').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Food Rewards
app.get('/food-rewards', async (req, res) => {
  try {
    const snapshot = await db.collection('food-rewards').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
