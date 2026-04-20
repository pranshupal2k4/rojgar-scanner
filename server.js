const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, 'jobs.json');

function readJobs() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeJobs(jobs) {
  fs.writeFileSync(dataFile, JSON.stringify(jobs, null, 2));
}

/* ================= GET ALL JOBS ================= */

app.get('/api/jobs', (req, res) => {
  const jobs = readJobs();
  res.json({ jobs });
});

/* ================= GET SINGLE JOB BY ID ================= */

app.get('/api/jobs/:id', (req, res) => {
  const { id } = req.params;

  const jobs = readJobs();

  const job = jobs.find(j => j._id === id);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.json(job);
});

/* ================= CREATE JOB ================= */

app.post('/api/jobs', (req, res) => {
  const jobs = readJobs();

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

  jobs.unshift(newJob);

  writeJobs(jobs);

  res.status(201).json({ jobs });
});
  
/* ================= UPDATE JOB ================= */

app.put('/api/jobs/:id', (req, res) => {
  const { id } = req.params;

  const jobs = readJobs();

  const index = jobs.findIndex(j => j._id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }

  jobs[index] = { ...jobs[index], ...req.body };

  writeJobs(jobs);

  res.json({ jobs });
});

/* ================= DELETE JOB ================= */

app.delete('/api/jobs/:id', (req, res) => {
  const { id } = req.params;

  const jobs = readJobs();

  const filtered = jobs.filter(j => j._id !== id);

  writeJobs(filtered);

  res.json({ jobs: filtered });
});

/* ================= START SERVER ================= */

app.listen(PORT, () => {
  console.log('Backend server running on http://localhost:' + PORT);
});