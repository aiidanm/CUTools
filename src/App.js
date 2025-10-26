import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostcodePlotter from './components/postcodeplotter';
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
    title: 'Loan Calculator',
    description: 'Estimate monthly repayments for different loan amounts, terms, and interest rates.',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="16" y2="21"></line><line x1="3" y1="8" x2="21" y2="8"></line><line x1="3" y1="16" x2="21" y2="16"></line></svg>`,
    path: '/budget-planner' 
  },
  {
    id: 3,
    title: 'Budget Planner',
    description: 'A simple and effective tool to help members manage their income and expenses.',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    path: '/loan-calculator' 
  },
    {
    id: 4,
    title: 'Savings Goal Tracker',
    description: 'Set a savings target and visualize your progress towards achieving your financial goals.',
    svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    path: '/savings-tracker' 
  },
];




const Header = () => (
  <header className="header">
    <div className="header-content">
      <h1 className="header-title">Credit Union Tools</h1>
      <p className="header-subtitle">by Aidan Murray</p>
    </div>
  </header>
);

const ToolTile = ({ title, description, svgIcon, path }) => (
  <Link to={path} className="tool-tile-link">
    <div className="tool-tile">
      <div className="tile-image-container" dangerouslySetInnerHTML={{ __html: svgIcon }} />
      <div>
        <h3 className="tile-title">{title}</h3>
        <p className="tile-description">{description}</p>
      </div>
    </div>
  </Link>
);

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
    <Header />
    <main>
      <ToolGrid />
    </main>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postcode-plotter" element={<PostcodePlotter />} />
      </Routes>
    </Router>
  );
}



