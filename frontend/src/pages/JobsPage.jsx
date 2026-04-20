import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../api.js";

export default function JobsPage() {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params   = new URLSearchParams(location.search);
  const type     = params.get("type"); // latest | result | admit | admission | answer-key | private jobs

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []))
      .catch(err => console.error("Failed to load jobs", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading jobs...</p>;

  const pageTitleMap = {
    "latest":      "Latest Jobs",
    "result":      "Results",
    "admit":       "Admit Card",
    "admission":   "Admission",
    "answer-key":  "Answer Key",
    "private jobs":"Private Jobs",
  };

  const pageTitle = pageTitleMap[type] || "All Government Jobs";

  // Category values exactly match what Admin saves in jobs.json
  const categoryMap = {
    "latest":      "latest-job",
    "result":      "result",
    "admit":       "admit-card",
    "admission":   "admission",
    "answer-key":  "answer-key",
    "private jobs":"private jobs",
  };

  const filteredJobs = type
    ? jobs.filter(j => j.category === categoryMap[type] && (j.status || "").toLowerCase() === "active")
    : jobs.filter(j => (j.status || "").toLowerCase() === "active");

  return (
    <main className="jobs-container">
      <h1 className="jobs-heading">{pageTitle}</h1>

      <ul className="all-jobs-list">
        {filteredJobs.map(job => (
          <li key={job._id}>
            {/* Fixed: use _id not slug */}
            <Link to={`/job/${job._id}`}>{job.title}</Link>
          </li>
        ))}
      </ul>

      {filteredJobs.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 20 }}>No jobs found.</p>
      )}
    </main>
  );
}
