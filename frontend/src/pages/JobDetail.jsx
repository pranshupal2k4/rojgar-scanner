import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api.js";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => setJob(res.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div style={loadingWrap}>
        <div style={spinner}></div>
        <p style={{ color: "#666", marginTop: 12 }}>Loading job details...</p>
      </div>
    );

  if (!job)
    return (
      <div style={loadingWrap}>
        <p style={{ color: "#b10000", fontSize: 18 }}>Job not found</p>
        <Link to="/" style={backLink}>← Back to Home</Link>
      </div>
    );

  const { title, board, importantLinks, fullDetails } = job;
  const pageUrl = window.location.href;
  const applyLink = importantLinks?.applyOnline || importantLinks?.apply || "#";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Noto Sans', sans-serif;
          background: #eef2f7;
        }

        .jd-page {
          background: linear-gradient(135deg, #eef2f7 0%, #dde6f0 100%);
          min-height: 100vh;
          padding: 16px 12px 40px;
        }

        .jd-breadcrumb {
          max-width: 1000px;
          margin: 0 auto 14px;
          font-size: 13px;
          color: #555;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .jd-breadcrumb a {
          color: #b10000;
          text-decoration: none;
          font-weight: 600;
        }
        .jd-breadcrumb a:hover { text-decoration: underline; }
        .jd-breadcrumb span { color: #333; font-weight: 500; }

        .jd-card {
          max-width: 1000px;
          margin: 0 auto;
          background: #fff;
          border-radius: 14px;
          padding: 28px 24px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
        }

        .jd-title {
          text-align: center;
          color: #b10000;
          font-size: clamp(18px, 3vw, 26px);
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 6px;
        }

        .jd-board {
          text-align: center;
          color: #444;
          font-size: 15px;
          margin-bottom: 16px;
        }

        .jd-banner {
          width: 100%;
          border-radius: 12px;
          margin: 14px 0 20px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          display: block;
        }

        /* ── Action Buttons ── */
        .jd-action-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .jd-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 22px;
          min-width: 148px;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          font-family: 'Noto Sans', sans-serif;
          border-radius: 8px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        }
        .jd-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          filter: brightness(1.08);
        }
        .jd-btn:active { transform: translateY(0); }

        .jd-btn-apply   { background: linear-gradient(135deg, #1e8c3a, #28a745); }
        .jd-btn-whats   { background: linear-gradient(135deg, #1da84f, #25D366); }
        .jd-btn-tele    { background: linear-gradient(135deg, #1a86bc, #229ED9); }

        /* ── Tables ── */
        .jd-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }

        .jd-table thead tr {
          background: #b10000;
          color: #fff;
        }
        .jd-table thead th {
          padding: 11px 14px;
          font-size: 14px;
          font-weight: 700;
          text-align: left;
          letter-spacing: 0.3px;
        }

        .jd-table tbody tr:nth-child(even) td { background: #fafafa; }
        .jd-table tbody tr:hover td { background: #fff5f5; }

        .jd-table td {
          border: 1px solid #e8e8e8;
          padding: 11px 14px;
          font-size: 14px;
          vertical-align: top;
          color: #333;
          line-height: 1.6;
          transition: background 0.15s;
        }

        .jd-table td.td-label {
          width: 32%;
          font-weight: 700;
          background: #f5f5f5;
          color: #222;
        }

        /* Important Links table */
        .jd-links-table {
          margin-top: 20px;
        }
        .jd-links-table a {
          display: inline-block;
          padding: 5px 14px;
          background: #b10000;
          color: #fff;
          border-radius: 5px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: background 0.15s, transform 0.12s;
        }
        .jd-links-table a:hover {
          background: #8c0000;
          transform: translateY(-1px);
        }

        /* Section heading */
        .jd-section-head {
          font-size: 15px;
          font-weight: 800;
          color: #b10000;
          background: #fff0f0;
          border-left: 4px solid #b10000;
          padding: 9px 14px;
          margin-top: 24px;
          margin-bottom: 0;
          border-radius: 0 6px 6px 0;
          letter-spacing: 0.3px;
        }

        /* Full details */
        .jd-full-details {
          margin-top: 10px;
          font-size: 14px;
          color: #333;
          line-height: 1.75;
        }
        .jd-full-details table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
        }
        .jd-full-details table td,
        .jd-full-details table th {
          border: 1px solid #ddd;
          padding: 9px 12px;
          font-size: 13.5px;
        }
        .jd-full-details table th {
          background: #b10000;
          color: #fff;
          font-weight: 700;
        }
        .jd-full-details table tr:nth-child(even) td { background: #fafafa; }
        .jd-full-details h2,
        .jd-full-details h3 {
          color: #b10000;
          margin: 18px 0 8px;
        }
        .jd-full-details a { color: #b10000; font-weight: 600; }

        /* Back */
        .jd-back {
          text-align: center;
          margin-top: 30px;
        }
        .jd-back a {
          display: inline-block;
          padding: 10px 24px;
          background: #b10000;
          color: #fff;
          border-radius: 7px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: background 0.15s, transform 0.12s;
        }
        .jd-back a:hover { background: #8c0000; transform: translateY(-2px); }

        /* Loading */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner-el {
          width: 40px; height: 40px;
          border: 4px solid #eee;
          border-top-color: #b10000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .jd-card { padding: 18px 14px; }
          .jd-table td.td-label { width: 38%; }
          .jd-btn { min-width: 120px; padding: 10px 14px; font-size: 13px; }
        }
      `}</style>

      <div className="jd-page">
        {/* Breadcrumb */}
        <div className="jd-breadcrumb">
          <Link to="/">🏠 Home</Link>
          <span>›</span>
          <span>{title}</span>
        </div>

        <div className="jd-card">
          <h1 className="jd-title">{title}</h1>
          {board && <p className="jd-board">{board}</p>}

          {job.banner?.image && (
            <img
              src={job.banner.image}
              alt={title}
              className="jd-banner"
            />
          )}

          {/* Action Buttons */}
          <div className="jd-action-row">
            <a href={applyLink} target="_blank" rel="noreferrer" className="jd-btn jd-btn-apply">
              ✅ Apply Online
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(title + " " + pageUrl)}`}
              target="_blank" rel="noreferrer"
              className="jd-btn jd-btn-whats"
            >
              🟢 WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`}
              target="_blank" rel="noreferrer"
              className="jd-btn jd-btn-tele"
            >
              ✈️ Telegram
            </a>
          </div>

          {/* Job Info Table */}
          <p className="jd-section-head">📋 Job Details</p>
          <table className="jd-table">
            <tbody>
              <tr>
                <td className="td-label">Eligibility</td>
                <td>{job.eligibility || "—"}</td>
              </tr>
              <tr>
                <td className="td-label">Age Limit</td>
                <td>{job.ageLimit || "—"}</td>
              </tr>
              <tr>
                <td className="td-label">Application Fee</td>
                <td>
                  General/OBC : {job.applicationFee?.general || "—"} <br />
                  SC/ST : {job.applicationFee?.scst || "—"} <br />
                  Female : {job.applicationFee?.female || "—"}
                </td>
              </tr>
              <tr>
                <td className="td-label">Important Dates</td>
                <td>
                  Apply Start : {job.importantDates?.applyStart || "—"} <br />
                  Last Date : {job.importantDates?.lastDate || "—"} <br />
                  Exam Date : {job.importantDates?.examDate || "—"} <br />
                  Admit Card : {job.importantDates?.admitCard || "—"}
                </td>
              </tr>
              <tr>
                <td className="td-label">How To Apply</td>
                <td>{job.howToApply || "—"}</td>
              </tr>
            </tbody>
          </table>

          {/* Important Links Table */}
          {importantLinks && Object.values(importantLinks).some((v) => v) && (
            <>
              <p className="jd-section-head">🔗 Important Links</p>
              <table className="jd-table jd-links-table">
                <tbody>
                  {importantLinks.applyOnline && (
                    <tr>
                      <td className="td-label">Apply Online</td>
                      <td><a href={importantLinks.applyOnline} target="_blank" rel="noreferrer">Click Here</a></td>
                    </tr>
                  )}
                  {importantLinks.officialWebsite && (
                    <tr>
                      <td className="td-label">Official Website</td>
                      <td><a href={importantLinks.officialWebsite} target="_blank" rel="noreferrer">Click Here</a></td>
                    </tr>
                  )}
                  {importantLinks.notificationPdf && (
                    <tr>
                      <td className="td-label">Notification PDF</td>
                      <td><a href={importantLinks.notificationPdf} target="_blank" rel="noreferrer">Click Here</a></td>
                    </tr>
                  )}
                  {importantLinks.admitCard && (
                    <tr>
                      <td className="td-label">Admit Card</td>
                      <td><a href={importantLinks.admitCard} target="_blank" rel="noreferrer">Click Here</a></td>
                    </tr>
                  )}
                  {importantLinks.result && (
                    <tr>
                      <td className="td-label">Result</td>
                      <td><a href={importantLinks.result} target="_blank" rel="noreferrer">Click Here</a></td>
                    </tr>
                  )}
                  {importantLinks.answerKey && (
                    <tr>
                      <td className="td-label">Answer Key</td>
                      <td><a href={importantLinks.answerKey} target="_blank" rel="noreferrer">Click Here</a></td>
                    </tr>
                  )}
                  {importantLinks.syllabusPdf && (
                    <tr>
                      <td className="td-label">Syllabus PDF</td>
                      <td><a href={importantLinks.syllabusPdf} target="_blank" rel="noreferrer">Click Here</a></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {/* Full Details */}
          {fullDetails && (
            <>
              <p className="jd-section-head">📄 Full Details</p>
              <div
                className="jd-full-details"
                dangerouslySetInnerHTML={{ __html: fullDetails }}
              />
            </>
          )}

          {/* Back Button */}
          <div className="jd-back">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Loading helpers (used above as inline styles)
const loadingWrap = {
  display: "flex", flexDirection: "column", alignItems: "center",
  justifyContent: "center", minHeight: "60vh", gap: 12,
};
const spinner = {
  width: 40, height: 40,
  border: "4px solid #eee",
  borderTopColor: "#b10000",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};
const backLink = {
  display: "inline-block", marginTop: 12,
  color: "#b10000", fontWeight: 600, textDecoration: "none",
};
