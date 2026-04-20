import { Outlet } from "react-router-dom";

const Layout = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="navbar">
        <div className="nav-top">
          <div className="navbar-brand">
            <img src="/mylogo.png" alt="Logo" className="logo" />
            <div className="brand-text">
              <span className="brand-name">Rojgar Scanner</span>
              <span className="brand-domain">RojgarScanner.in</span>
            </div>
          </div>
        </div>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search jobs, result, admit card..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <Outlet />

      {/* ===== FOOTER ===== */}
      <footer className="footer-main">
        <div className="footer-bottom">
          © {new Date().getFullYear()} RojgarScanner.in | All Rights Reserved
        </div>
      </footer>
    </>
  );
};

export default Layout;
