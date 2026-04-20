import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import JobsPage from "./pages/JobsPage";
import Admin from "./pages/Admin";
import JobDetail from "./pages/JobDetail";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";



import { API_URL } from "./api.js";

/* ===== SCROLLING INFO STRIP ===== */
function ScrollingInfoStrip() {
  return null;
}



/* ===== TOP INFO STRIP ===== */
function TopInfoStrip() {
  return (
    <div className="top-info-strip">
      <h1 className="top-title">
        Rojgar Scanner: Latest Sarkari Naukri, Govt Jobs, Online Form,
        Admit Card & Results 2025
      </h1>

      <div className="top-welcome">
        Welcome To India No. 1 Education Portal Rojgar Scanner
      </div>

      <div className="top-links">
        <a href="https://whatsapp.com/channel/0029Vb75HDLLI8YdTeHcS50p">Whatsapp Channel</a>
        <span> | </span>
        <a href="https://www.youtube.com/@Rojgar_Scanner">YouTube Channel</a>
        <span> | </span>
        <a href="https://www.facebook.com/share/1AQXjknSmi/">Facebook</a>
        <span> | </span>
        <a href="https://t.me/Rojgar_Scanner">Telegram Channel</a>
        <span> | </span>
      </div>

      
    </div>
  );
}

/* ================= APP ROOT ================= */
export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
  if (Array.isArray(data)) {
    setJobs(data);
  } else if (Array.isArray(data.jobs)) {
    setJobs(data.jobs);
  } else {
    setJobs([]);
  }
})

    .finally(() => setLoading(false));
}, []);




/* ===== SORT + SEARCH (FIXED & SAFE) ===== */

// 1️⃣ ensure jobs is always array
const safeJobs = Array.isArray(jobs) ? jobs : [];

// 2️⃣ filter active jobs
const sortedJobs = safeJobs
  .filter(j => (j.status || "").toLowerCase() === "active")
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// 3️⃣ search filter  ✅ (YAHI MISSING THA)
const searchedJobs = sortedJobs.filter(j =>
  (j.title || "").toLowerCase().includes(searchQuery.toLowerCase())
);

// 4️⃣ category filters
const latestJobs = searchedJobs.filter(
  j => (j.category || "").toLowerCase() === "latest-job"
);

const results = searchedJobs.filter(
  j => (j.category || "").toLowerCase() === "result"
);

const answerKeys = searchedJobs.filter(
  j => (j.category || "").toLowerCase() === "answer-key"
);

const admit = searchedJobs.filter(
  j => (j.category || "").toLowerCase() === "admit-card"
);

const admissionJobs = searchedJobs.filter(
  j => (j.category || "").toLowerCase() === "admission"
);

const privateJobs = searchedJobs.filter(
  j => (j.category || "").toLowerCase() === "private-job"
);


  return (
    <BrowserRouter>
    

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="nav-top">
          <div className="navbar-brand">
            <img src="/mylogo.png" alt="Logo" className="logo" />
            <div className="brand-text">
              <span className="brand-name">Rojgar Scanner</span>
              <span className="brand-domain">RojgarScanner.in</span>
            </div>
          </div>
<button
  className="hamburger"
  onClick={() => setMenuOpen(prev => !prev)}
>
  ☰
</button>
          
        </div>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search jobs, result, admit card..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

   <div className="navbar-links">
  <a href="#latest">Latest Jobs</a>
  <a href="#result">Result</a>
  <a href="#admit">Admit Card</a>
  <a href="#admission">Admission</a>

  <div className="nav-more">
   <button
  type="button"
  className="nav-more-btn"
  onClick={() => {
    console.log("MORE CLICKED", moreOpen);
    setMoreOpen(prev => !prev);
  }}
>
  More ▾
</button>
 

    {moreOpen && (
      <div className="nav-more-menu">
        <Link to="/contact-us" onClick={() => setMoreOpen(false)}>
          Contact Us
        </Link>
        <Link to="/privacy-policy" onClick={() => setMoreOpen(false)}>
          Privacy Policy
        </Link>
      </div>
    )}
  </div>
</div>
 
</header>
      {menuOpen && (
  <>
    <div
      className="menu-backdrop"
      onClick={() => setMenuOpen(false)}
    />

    <div className="mobile-menu">
      {/* HEADER */}
      <div className="mobile-menu-header">
        <span className="mobile-menu-title">MENU</span>
        <button
          className="menu-close"
          onClick={() => setMenuOpen(false)}
        >
          ✖
        </button>
      </div>

      {/* LINKS */}
      <a onClick={() => setMenuOpen(false)}>
        <span>Latest Jobs</span>
        <span className="menu-arrow">›</span>
      </a>

      <a onClick={() => setMenuOpen(false)}>
        <span>Result</span>
        <span className="menu-arrow">›</span>
      </a>

      <a onClick={() => setMenuOpen(false)}>
        <span>Admit Card</span>
        <span className="menu-arrow">›</span>
      </a>

      <a onClick={() => setMenuOpen(false)}>
        <span>Answer Key</span>
        <span className="menu-arrow">›</span>
      </a>

      <a onClick={() => setMenuOpen(false)}>
        <span>Admission</span>
        <span className="menu-arrow">›</span>
      </a>
    </div>
  </>
)}

<ScrollingInfoStrip />
<TopInfoStrip />


      {/* ================= ROUTES ================= */}
      <Routes>

        <Route path="/admin" element={<Admin />} />
  

        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* ===== HOME ===== */}
        <Route
  path="/"
  element={
    <main className="site-container">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <BannerCards jobs={latestJobs} />

          <div className="three-column-grid">
            <CategoryColumn
  title="LATEST JOBS"
  color="#b10000"
  jobs={latestJobs}
  viewMoreLink="/jobs?type=latest"
/>

            
            <CategoryColumn
  title="RESULT"
  color="#006400"
  jobs={results}
  viewMoreLink="/jobs?type=result"
/>

<CategoryColumn
  title="ADMIT CARD"
  color="#003366"
  jobs={admit}
  viewMoreLink="/jobs?type=admit"
/>
<CategoryColumn
  title="ADMISSION"
  color="#4B0082"
  jobs={admissionJobs}
  viewMoreLink="/jobs?type=admission"
/>

<CategoryColumn
  title="ANSWER KEY"
  color="#8B0000"
  jobs={answerKeys}
  viewMoreLink="/jobs?type=answer-key"
/>

<CategoryColumn
  title="PRIVATE JOBS"
  color="#2F4F4F"
  jobs={privateJobs}
  viewMoreLink="/jobs?type=private jobs"
/>


          </div>
        </>
      )}
    </main>
  }
/>


      </Routes>
      <StaticBottomContent />

      

      <FloatingButtons />
      

     <footer className="footer-main">
  <div className="footer-container">

    {/* BRAND */}
    <div className="footer-col">
      <h3>Rojgar Scanner</h3>
      <p>
        Rojgar Scanner is India’s trusted education & government job portal.
        Get latest Sarkari Naukri, Results, Admit Cards and Online Forms.
      </p>
    </div>

    {/* QUICK LINKS */}
    <div className="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#latest">Latest Jobs</a></li>
        <li><a href="#result">Results</a></li>
        <li><a href="#admit">Admit Card</a></li>
        <li><a href="#answer">Answer Key</a></li>
        <li><a href="#admission">Admission</a></li>
      </ul>
    </div>

    {/* IMPORTANT */}
    <div className="footer-col">
      <h4>Important</h4>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Disclaimer</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>

    {/* SOCIAL */}
    <div className="footer-col">
      <h4>Follow Us</h4>
      <ul>
        <li><a href="https://t.me/Rojgar_Scanner">Telegram</a></li>
        <li><a href="https://whatsapp.com/channel/0029Vb75HDLLI8YdTeHcS50p">WhatsApp</a></li>
        <li><a href="https://www.youtube.com/@Rojgar_Scanner">YouTube</a></li>
        <li><a href="https://www.facebook.com/share/1AQXjknSmi/">Facebook</a></li>
        <li><a href="https://www.youtube.com/@Rojgar_Scanner">Twitter(x)</a></li>
      </ul>
    </div>

  </div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} RojgarScanner.in | All Rights Reserved
  </div>
</footer>
 

    </BrowserRouter>
  );
}

/* ================= STATIC BOTTOM CONTENT ================= */

function StaticBottomContent() {
  return (
    <section className="static-bottom site-container">

      <h2 className="static-head">Sarkari Result • Latest Government Jobs</h2>

      <table className="static-table">
        <tbody>
          <tr>
            <td>UP Police Result</td>
            <td>Bihar Police Result</td>
            <td>SSC Result</td>
          </tr>
          <tr>
            <td>Railway Jobs</td>
            <td>Defence Jobs</td>
            <td>10+2 Jobs</td>
          </tr>
          <tr>
            <td>Graduate Jobs</td>
            <td>Admit Card</td>
            <td>Answer Key</td>
          </tr>
        </tbody>
      </table>

      <p className="static-text">
        <strong>RojgarScanner.in</strong> provides latest Sarkari Naukri,
        Government Jobs, Results, Admit Cards, Answer Keys and Syllabus updates
        from official sources in one place.
      </p>
     

  <h2>Rojgar Scanner 10+2 Latest Job</h2>
  <p>
    Most recent Sarkari Work, Sarkari Test Result, and latest updates available
    on the web in a well-structured format. Rojgar Scanner provides information
    about government jobs, answer keys, admit cards, exam notifications, and
    results connected with various Sarkari examinations. Users can find Rojgar Scanner
     10+2 latest job updates at one place consistently.
  </p>

  <h2>Rojgar Scanner</h2>
  <p>
    Rojgar Scanneris one of the most popular platforms in India that provides
    data related to Sarkari work, Sarkari test results, government exams, and
    recruitment notifications. It is a trusted source for students and job
    seekers to find accurate information regarding exams, test dates, answer
    keys, admit cards, and results related to various government departments.
  </p>

  <h2>Rojgar Scanner Bihar</h2>
  <p>
    Rojgar Scanner Bihar includes all important updates related to Bihar state
    examinations such as BPSC, Bihar Police, OFSS Bihar, Bihar Board 10th &
    12th results, Bihar SSC, Bihar JE, Bihar Common Court, and other Bihar
    government recruitments. Candidates can get Bihar Rojgar Scanner, Bihar
    Board Result, Bihar Work updates, and latest notifications in one place.
  </p>

  <h2>Rojgar Scanner Hindi</h2>
  <p>
    Rojgar Scanner Hindi section is designed for candidates who prefer exam
    updates in Hindi language. It covers all major government examinations
    including UP Board, UP Police, UPSSSC, Railway, SSC, and other state-level
    recruitments. This section helps Hindi medium students to stay updated with
    Rojgar Scanner, admit cards, answer keys, and online forms easily.
  </p>

  <h2>RojgarScanner Official Website</h2>
  <p>
    RojgarScanner.in works as an informational platform similar to Rojgar Scanner
    official websites by collecting data from authentic and official government
    sources. The website provides updates related to results, online forms,
    government job notifications, admit cards, answer keys, and syllabus. This
    website is not associated with any government organization and all
    information is provided for general informational purposes only. Users are
    advised to verify details from the official websites before applying.
  </p>



    </section>
  );
}



/* ================= COMPONENTS ================= */

/* ================= BANNER CARDS ================= */
export function BannerCards({ jobs = [] }) {
  return (
    <section className="top-banner">
      <div className="top-banner-head">
        <h1>Rojgar Scanner – RojgarScanner.in</h1>
        <p>Trusted Portal Since 2025</p>
      </div>

      <div className="top-banner-cards">
        {jobs.slice(0, 8).map((job, i) => (
          <Link
            key={job._id}
            to={`/job/${job._id}`}
            className={`top-card card-${(i % 8) + 1}`}
          >
            <span className="top-card-badge">
              {job.badge || "NEW"}
            </span>
            <div className="top-card-title">
              {job.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ================= CATEGORY COLUMN ================= */
export function CategoryColumn({
  title,
  jobs = [],
  color,
  viewMoreLink = ""
}) {
  return (
    <div className="category-box">
      <div className="category-head" style={{ background: color }}>
        {title}
      </div>

      <ul className="category-list">
        {jobs.slice(0, 20).map(job => (
          <li key={job._id}>
            <Link to={`/job/${job._id}`}>
              {job.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* ✅ VIEW MORE */}
      {viewMoreLink && jobs.length > 20 && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Link to={viewMoreLink} className="view-more-btn">
            View More →
          </Link>
        </div>
      )}
    </div>
  );
}



/* ================= FLOATING SOCIAL BUTTONS ================= */

function FloatingButtons() {
  return (
    <div className="social-float">
      <a
        href="https://whatsapp.com/channel/0029Vb75HDLLI8YdTeHcS50p"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn whatsapp"
      >
        WhatsApp
      </a>

      <a
        href="https://t.me/Rojgar_Scanner"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn telegram"
      >
        Telegram
      </a>
    </div>
  );
}

