import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
import { API_URL } from "../api.js";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API_URL}/${id}`)
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
  const applyLink = importantLinks?.applyOnline || importantLinks?.apply || "#";

  return (
    <div style={page}>
      <div style={breadcrumb}>
        <Link to="/">Home</Link> / <span>{title}</span>
      </div>

      <div style={card} className="job-card">
        <h1 style={titleStyle}>{title}</h1>
        {board && <p style={subTitle}>{board}</p>}

        {job.banner?.image && (
          <img
            src={job.banner.image}
            alt={job.title}
            style={{ width: "100%", borderRadius: 12, margin: "15px 0", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
          />
        )}

        <div style={actionRow}>
          <a href={applyLink} target="_blank" rel="noreferrer" style={btnApply}>Apply Online</a>
          <a href={`https://wa.me/?text=${encodeURIComponent(title + " " + pageUrl)}`} target="_blank" rel="noreferrer" style={btnWhats}>WhatsApp</a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" style={btnTele}>Telegram</a>
        </div>

        <table style={mainTable}>
          <tbody>
            <tr><td style={left}>Eligibility</td><td style={right}>{job.eligibility || "—"}</td></tr>
            <tr><td style={left}>Age Limit</td><td style={right}>{job.ageLimit || "—"}</td></tr>
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
            <tr><td style={left}>How To Apply</td><td style={right}>{job.howToApply || "—"}</td></tr>
          </tbody>
        </table>

        {importantLinks && Object.values(importantLinks).some(v => v) && (
          <table style={{ ...mainTable, marginTop: 16 }}>
            <tbody>
              {importantLinks.applyOnline   && <tr><td style={left}>Apply Online</td>      <td style={right}><a href={importantLinks.applyOnline}   target="_blank" rel="noreferrer">Click Here</a></td></tr>}
              {importantLinks.officialWebsite && <tr><td style={left}>Official Website</td> <td style={right}><a href={importantLinks.officialWebsite} target="_blank" rel="noreferrer">Click Here</a></td></tr>}
              {importantLinks.notificationPdf && <tr><td style={left}>Notification PDF</td> <td style={right}><a href={importantLinks.notificationPdf} target="_blank" rel="noreferrer">Click Here</a></td></tr>}
              {importantLinks.admitCard      && <tr><td style={left}>Admit Card</td>        <td style={right}><a href={importantLinks.admitCard}      target="_blank" rel="noreferrer">Click Here</a></td></tr>}
              {importantLinks.result         && <tr><td style={left}>Result</td>            <td style={right}><a href={importantLinks.result}         target="_blank" rel="noreferrer">Click Here</a></td></tr>}
              {importantLinks.answerKey      && <tr><td style={left}>Answer Key</td>        <td style={right}><a href={importantLinks.answerKey}      target="_blank" rel="noreferrer">Click Here</a></td></tr>}
              {importantLinks.syllabusPdf    && <tr><td style={left}>Syllabus PDF</td>      <td style={right}><a href={importantLinks.syllabusPdf}    target="_blank" rel="noreferrer">Click Here</a></td></tr>}
            </tbody>
          </table>
        )}

        {fullDetails && (
          <div className="job-full-details" style={{ marginTop: 30 }}>
            <div dangerouslySetInnerHTML={{ __html: fullDetails }} />
          </div>
        )}

        <div style={back}><Link to="/">← Back to Home</Link></div>
      </div>
    </div>
  );
}

const page       = { background: "#eef2f7", padding: 12 };
const breadcrumb = { maxWidth: 1000, margin: "10px auto", fontSize: 14 };
const card       = { maxWidth: 1000, margin: "auto", background: "#fff", padding: 20, borderRadius: 10 };
const titleStyle = { textAlign: "center", color: "#b10000", fontWeight: 800 };
const subTitle   = { textAlign: "center", marginBottom: 15 };
const actionRow  = { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 };
const btnBase    = { padding: "12px 18px", minWidth: 140, textAlign: "center", color: "#fff", fontWeight: 700, borderRadius: 6, textDecoration: "none" };
const btnApply   = { ...btnBase, background: "#28a745" };
const btnWhats   = { ...btnBase, background: "#25D366" };
const btnTele    = { ...btnBase, background: "#229ED9" };
const mainTable  = { width: "100%", borderCollapse: "collapse", marginTop: 10 };
const left       = { width: "30%", border: "1px solid #ddd", padding: 10, fontWeight: 700, background: "#f5f5f5" };
const right      = { border: "1px solid #ddd", padding: 10 };
const back       = { textAlign: "center", marginTop: 30 };
