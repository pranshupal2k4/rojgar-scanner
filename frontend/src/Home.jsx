import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BannerCards({ jobs }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!jobs || jobs.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % jobs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [jobs]);

  if (!jobs || jobs.length === 0) return null;

  const job = jobs[index];

  return (
    <div className="banner">
      <h2>{job.title}</h2>
      <p>{job.shortInfo}</p>

      {/* FIXED ROUTE PATH */}
      <Link to={`/job/${job._id}`} className="banner-btn">
        View Job
      </Link>
    </div>
  );
}

export default BannerCards;