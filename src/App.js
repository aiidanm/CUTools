import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PostcodePlotter from './components/postcodeplotter';
import CreditSummary from './CreditSummary';
import './App.css';


const tools = [
  {
    id: 1,
    title: 'Postcode Plotter',
    description: 'Plot common bond or other geographic areas by postcode. Change colours, opacity and save in different formats',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    path: '/postcode-plotter'
  },
  {
    id: 2,
    title: 'Credit Summary Generator',
    description: 'Check your credit report for adverse entries and generate a summary for lenders quickly and easily.',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="16" y2="21"></line><line x1="3" y1="8" x2="21" y2="8"></line><line x1="3" y1="16" x2="21" y2="16"></line></svg>`,
    path: '/credit-summary' 
  }
];




const NavHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-header">
      <div className="nav-inner">
        <div className="logo-section">
          <h1>CUTools</h1>
          <span>by Aidan Murray</span>
        </div>

        <button
          className="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/postcode-plotter" onClick={closeMenu}>Postcode Plotter</Link>
          <Link to="/credit-summary" onClick={closeMenu}>Loan Calculator</Link>
          <Link to="/budget-planner" onClick={closeMenu}>Budget Planner</Link>
          <Link to="/savings-tracker" onClick={closeMenu}>Savings Tracker</Link>
        </nav>
      </div>
    </header>
  );
};

const ToolTile = ({ title, description, svgIcon, path }) => {

  return (
    <div className={`tool-tile-link'}`}>
      <Link to={ path} className={`tool-tile-inner'}`}>
        <div className="tool-tile">
          <div className="tile-image-container" dangerouslySetInnerHTML={{ __html: svgIcon }} />
          <div>
            <h3 className="tile-title">{title}</h3>
            <p className="tile-description">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ToolGrid = () => (
  <div className="tool-grid">
    {tools.map((tool) => (
      <ToolTile
        key={tool.id}
        title={tool.title}
        description={tool.description}
        svgIcon={tool.svgIcon}
        path={tool.path}
      />
    ))}
  </div>
);

const Home = () => (
  <div className="app-container">
    <main>
      <ToolGrid />
    </main>
  </div>
);

export default function App() {
  return (
    <>
      <NavHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postcode-plotter" element={<PostcodePlotter />} />
        <Route path="/credit-summary" element={<CreditSummary />} />
        <Route path="/budget-planner" element={<div>Budget Planner Coming Soon</div>} />
        <Route path="/savings-tracker" element={<div>Savings Tracker Coming Soon</div>} />
      </Routes>
    </>
  );
}



