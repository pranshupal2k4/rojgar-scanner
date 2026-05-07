import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/api/jobs/${id}`) // ✅ correct endpoint
      .then(res => setJob(res.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  if (!job)
    return <p style={{ textAlign: "center", marginTop: 40 }}>Job not found</p>;

  const { title, board, importantLinks, fullDetails } = job;

  const pageUrl = window.location.href;

  const applyLink =
    importantLinks?.applyOnline ||
    importantLinks?.apply ||
    "#";

  return (
    <div style={page}>
      <div style={breadcrumb}>
        <Link to="/">Home</Link> / <span>{title}</span>
      </div>

      <div style={card} className="job-card">

        <h1 style={titleStyle}>{title}</h1>

        {board && <p style={subTitle}>{board}</p>}

        {/* banner */}
        {job.banner?.image && (
          <img
            src={job.banner.image}
            alt={job.title}
            style={{
              width: "100%",
              borderRadius: 12,
              margin: "15px 0",
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)"
            }}
          />
        )}

        {/* action buttons */}
        <div style={actionRow}>

          <a href={applyLink} target="_blank" rel="noreferrer" style={btnApply}>
            Apply Online
          </a>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(title + " " + pageUrl)}`}
            target="_blank"
            rel="noreferrer"
            style={btnWhats}
          >
            WhatsApp
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noreferrer"
            style={btnTele}
          >
            Telegram
          </a>

        </div>

        {/* main details table */}
        <table style={mainTable}>
          <tbody>

            <tr>
              <td style={left}>Eligibility</td>
              <td style={right}>{job.eligibility || "—"}</td>
            </tr>

            <tr>
              <td style={left}>Age Limit</td>
              <td style={right}>{job.ageLimit || "—"}</td>
            </tr>

            <tr>
              <td style={left}>Application Fee</td>
              <td style={right}>
                General/OBC : {job.applicationFee?.general || "—"} <br />
                SC/ST : {job.applicationFee?.scst || "—"} <br />
                Female : {job.applicationFee?.female || "—"}
              </td>
            </tr>

            <tr>
              <td style={left}>Important Dates</td>
              <td style={right}>
                Apply Start : {job.importantDates?.applyStart || "—"} <br />
                Last Date : {job.importantDates?.lastDate || "—"} <br />
                Exam Date : {job.importantDates?.examDate || "—"} <br />
                Admit Card : {job.importantDates?.admitCard || "—"}
              </td>
            </tr>

            <tr>
              <td style={left}>How To Apply</td>
              <td style={right}>{job.howToApply || "—"}</td>
            </tr>

          </tbody>
        </table>

        {/* full html details */}
        {fullDetails && (
          <div className="job-full-details" style={{ marginTop: 30 }}>
            <div dangerouslySetInnerHTML={{ __html: fullDetails }} />
          </div>
        )}

        <div style={back}>
          <Link to="/">← Back to Home</Link>
        </div>

      </div>
    </div>
  );
}


/* ===== styles ===== */

const page = { background: "#eef2f7", padding: 12 };

const breadcrumb = {
  maxWidth: 1000,
  margin: "10px auto",
  fontSize: 14
};

const card = {
  maxWidth: 1000,
  margin: "auto",
  background: "#fff",
  padding: 20,
  borderRadius: 10
};

const titleStyle = {
  textAlign: "center",
  color: "#b10000",
  fontWeight: 800
};

const subTitle = {
  textAlign: "center",
  marginBottom: 15
};

const actionRow = {
  display: "flex",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 20
};

const btnBase = {
  padding: "12px 18px",
  minWidth: 140,
  textAlign: "center",
  color: "#fff",
  fontWeight: 700,
  borderRadius: 6,
  textDecoration: "none"
};

const btnApply = { ...btnBase, background: "#28a745" };

const btnWhats = { ...btnBase, background: "#25D366" };

const btnTele = { ...btnBase, background: "#229ED9" };

const mainTable = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 10
};

const left = {
  width: "30%",
  border: "1px solid #ddd",
  padding: 10,
  fontWeight: 700,
  background: "#f5f5f5"
};

const right = {
  border: "1px solid #ddd",
  padding: 10
};

const back = {
  textAlign: "center",
  marginTop: 30
};
