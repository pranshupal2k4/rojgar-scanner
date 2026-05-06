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
    return <div className="job-loading"><span>Loading...</span></div>;

  if (!job)
    return <div className="job-not-found"><span>Job not found</span></div>;

  const { title, board, importantLinks, fullDetails } = job;
  const pageUrl = window.location.href;
  const applyLink = importantLinks?.applyOnline || importantLinks?.apply || "#";

  return (
    <div className="job-detail-wrapper">
      <div className="job-breadcrumb">
        <Link to="/">🏠 Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{title}</span>
      </div>

      <div className="job-detail-card">
        {/* HERO SECTION */}
        <div className="job-hero">
          <h1 className="job-title">{title}</h1>
          {board && <p className="job-board">{board}</p>}

          {job.banner?.image && (
            <img
              src={job.banner.image}
              alt={job.title}
              className="job-banner-img"
            />
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="job-action-buttons">
          <a href={applyLink} target="_blank" rel="noreferrer" className="job-btn job-btn-apply">
            ✓ Apply Online
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(title + " " + pageUrl)}`} target="_blank" rel="noreferrer" className="job-btn job-btn-whatsapp">
            📱 WhatsApp
          </a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" className="job-btn job-btn-telegram">
            ✈️ Telegram
          </a>
        </div>

        {/* MAIN INFO TABLE */}
        <div className="job-info-section">
          <h2 className="section-title">📋 Job Details</h2>
          <div className="job-info-grid">
            <div className="info-item">
              <span className="info-label">Eligibility</span>
              <span className="info-value">{job.eligibility || "Not Specified"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age Limit</span>
              <span className="info-value">{job.ageLimit || "Not Specified"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Application Fee</span>
              <div className="info-value">
                {job.applicationFee?.general && <span>General/OBC: ₹{job.applicationFee.general}</span>}
                {job.applicationFee?.scst && <span>SC/ST: ₹{job.applicationFee.scst}</span>}
                {job.applicationFee?.female && <span>Female: ₹{job.applicationFee.female}</span>}
                {!job.applicationFee?.general && !job.applicationFee?.scst && !job.applicationFee?.female && <span>Not Specified</span>}
              </div>
            </div>
            <div className="info-item">
              <span className="info-label">How To Apply</span>
              <span className="info-value">{job.howToApply || "Not Specified"}</span>
            </div>
          </div>
        </div>

        {/* IMPORTANT DATES TABLE */}
        <div className="job-dates-section">
          <h2 className="section-title">📅 Important Dates</h2>
          <div className="job-dates-grid">
            {job.importantDates?.applyStart && (
              <div className="date-item">
                <span className="date-label">📝 Apply Start</span>
                <span className="date-value">{job.importantDates.applyStart}</span>
              </div>
            )}
            {job.importantDates?.lastDate && (
              <div className="date-item">
                <span className="date-label">⏰ Last Date</span>
                <span className="date-value">{job.importantDates.lastDate}</span>
              </div>
            )}
            {job.importantDates?.examDate && (
              <div className="date-item">
                <span className="date-label">🎯 Exam Date</span>
                <span className="date-value">{job.importantDates.examDate}</span>
              </div>
            )}
            {job.importantDates?.admitCard && (
              <div className="date-item">
                <span className="date-label">🎫 Admit Card</span>
                <span className="date-value">{job.importantDates.admitCard}</span>
              </div>
            )}
          </div>
        </div>

        {/* IMPORTANT LINKS */}
        {importantLinks && Object.values(importantLinks).some(v => v) && (
          <div className="job-links-section">
            <h2 className="section-title">🔗 Important Links</h2>
            <div className="job-links-grid">
              {importantLinks.applyOnline && (
                <a href={importantLinks.applyOnline} target="_blank" rel="noreferrer" className="link-card">
                  <span className="link-icon">🔗</span>
                  <span className="link-text">Apply Online</span>
                </a>
              )}
              {importantLinks.officialWebsite && (
                <a href={importantLinks.officialWebsite} target="_blank" rel="noreferrer" className="link-card">
                  <span className="link-icon">🌐</span>
                  <span className="link-text">Official Website</span>
                </a>
              )}
              {importantLinks.notificationPdf && (
                <a href={importantLinks.notificationPdf} target="_blank" rel="noreferrer" className="link-card">
                  <span className="link-icon">📄</span>
                  <span className="link-text">Notification PDF</span>
                </a>
              )}
              {importantLinks.admitCard && (
                <a href={importantLinks.admitCard} target="_blank" rel="noreferrer" className="link-card">
                  <span className="link-icon">🎫</span>
                  <span className="link-text">Admit Card</span>
                </a>
              )}
              {importantLinks.result && (
                <a href={importantLinks.result} target="_blank" rel="noreferrer" className="link-card">
                  <span className="link-icon">✅</span>
                  <span className="link-text">Result</span>
                </a>
              )}
              {importantLinks.answerKey && (
                <a href={importantLinks.answerKey} target="_blank" rel="noreferrer" className="link-card">
                  <span className="link-icon">📝</span>
                  <span className="link-text">Answer Key</span>
                </a>
              )}
              {importantLinks.syllabusPdf && (
                <a href={importantLinks.syllabusPdf} target="_blank" rel="noreferrer" className="link-card">
                  <span className="link-icon">📚</span>
                  <span className="link-text">Syllabus PDF</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* FULL DETAILS */}
        {fullDetails && (
          <div className="job-full-details">
            <h2 className="section-title">📖 Full Details</h2>
            <div className="job-full-details-content">
              <div dangerouslySetInnerHTML={{ __html: fullDetails }} />
            </div>
          </div>
        )}

        {/* BACK BUTTON */}
        <div className="job-back-btn">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
