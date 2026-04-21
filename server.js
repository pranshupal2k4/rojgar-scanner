const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

let db;

async function connectDB() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  db = client.db('rojgar');
  console.log('MongoDB connected!');
}

app.get('/api/jobs', async (req, res) => {
  const jobs = await db.collection('jobs').find().sort({ createdAt: -1 }).toArray();
  res.json({ jobs });
});

app.get('/api/jobs/:id', async (req, res) => {
  const job = await db.collection('jobs').findOne({ _id: req.params.id });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

app.post('/api/jobs', async (req, res) => {
  const body = req.body || {};
  const newJob = {
    _id: Date.now().toString(),
    title: body.title || '',
    category: body.category || '',
    link: body.link || '#',
    badge: body.badge || 'New',
    status: body.status || 'Active',
    board: body.board || '',
    eligibility: body.eligibility || '',
    ageLimit: body.ageLimit || '',
    applicationFee: body.applicationFee || {},
    importantDates: body.importantDates || {},
    importantLinks: body.importantLinks || {},
    banner: body.banner || {},
    howToApply: body.howToApply || '',
    fullDetails: body.fullDetails || '',
    createdAt: new Date().toISOString()
  };
  await db.collection('jobs').insertOne(newJob);
  const jobs = await db.collection('jobs').find().sort({ createdAt: -1 }).toArray();
  res.status(201).json({ jobs });
});

app.put('/api/jobs/:id', async (req, res) => {
  await db.collection('jobs').updateOne({ _id: req.params.id }, { $set: req.body });
  const jobs = await db.collection('jobs').find().sort({ createdAt: -1 }).toArray();
  res.json({ jobs });
});

app.delete('/api/jobs/:id', async (req, res) => {
  await db.collection('jobs').deleteOne({ _id: req.params.id });
  const jobs = await db.collection('jobs').find().sort({ createdAt: -1 }).toArray();
  res.json({ jobs });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log('Server running on port ' + PORT));
});
