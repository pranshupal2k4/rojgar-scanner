const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "jobs.json");

/* ================= HELPERS ================= */

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildFullDetails(job) {
  return `
<h2 style="text-align:center;color:#b10000;">${job.board || ""}</h2>
<h3 style="text-align:center;color:#0066cc;">${job.title}</h3>

<p style="text-align:center;">
<a href="${job.applyLink}" target="_blank">Official Website</a>
</p>

<hr/>

<h2>Important Dates</h2>
<ul>
  <li>Application Start : 01 January 2025</li>
  <li>Last Date : 31 January 2025</li>
</ul>

<h2>Eligibility</h2>
<p>${job.qualification || job.eligibility || "As per notification"}</p>

<h2>Age Limit</h2>
<p>${job.age || job.ageLimit || "As per notification"}</p>

<h2>Application Fee</h2>
<p>
General: ₹${job.fee ?? "—"} |
SC/ST: ₹${job.feeSC ?? "—"}
</p>

<h2>Important Links</h2>
<a href="${job.applyLink}" target="_blank">Apply Online</a>
`;
}

/* ================= RAW JOB DATA ================= */
/* Yahan tum jitna chaaho data rakho */

const jobData = [
  {
    title: "UP Police Constable Recruitment 2025",
    board: "UP Police Recruitment & Promotion Board",
    applyLink: "https://uppbpb.gov.in",
    qualification: "12th Pass",
    age: "18–25 Years",
    fee: 400,
    feeSC: 0
  },
  {
    title: "SSC GD Constable Recruitment 2025",
    board: "Staff Selection Commission",
    applyLink: "https://ssc.nic.in",
    qualification: "10th Pass",
    age: "18–23 Years",
    fee: 100,
    feeSC: 0
  },
  {
    title: "Railway Group D Recruitment 2025",
    board: "Railway Recruitment Board",
    applyLink: "https://rrbcdg.gov.in",
    qualification: "10th / ITI",
    age: "18–33 Years",
    fee: 500,
    feeSC: 250
  },
  {
    title: "Bihar Police Constable Recruitment 2025",
    board: "Central Selection Board of Constable Bihar",
    applyLink: "https://csbc.bih.nic.in",
    qualification: "12th Pass",
    age: "18–25 Years",
    fee: 450,
    feeSC: 112
  },
  {
    title: "SSC CHSL Recruitment 2025",
    board: "Staff Selection Commission",
    applyLink: "https://ssc.nic.in",
    qualification: "12th Pass",
    age: "18–27 Years",
    fee: 100,
    feeSC: 0
  },
  {
    title: "SSC CGL Recruitment 2025",
    board: "Staff Selection Commission",
    applyLink: "https://ssc.nic.in",
    qualification: "Graduation",
    age: "18–32 Years",
    fee: 100,
    feeSC: 0
  }
];

/* ================= FINAL JOBS BUILD ================= */

const jobs = jobData.map((job, index) => {
  return {
    _id: Date.now().toString() + index,
    title: job.title,
    slug: slugify(job.title),

    category: "Latest Job",
    status: "Active",
    badge: "NEW",

    board: job.board || "",
    eligibility: job.qualification || "",
    ageLimit: job.age || "",
    applicationFee: job.fee
      ? `General ₹${job.fee}, SC/ST ₹${job.feeSC}`
      : "",

    importantDates: "01 Jan 2025 – 31 Jan 2025",
    howToApply: "Apply Online",

    applyLink: job.applyLink,

    notificationPdf: "",
    syllabusPdf: "",

    fullDetails: buildFullDetails(job),

    createdAt: new Date().toISOString()
  };
});

/* ================= WRITE FILE ================= */

fs.writeFileSync(dataFile, JSON.stringify(jobs, null, 2), "utf-8");

console.log("✅ jobs.json generated successfully with FULL job details");
