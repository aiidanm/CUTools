import React, { useState } from 'react';
import { Home, Calculator, ShieldCheck, BarChart2, Menu, X } from 'lucide-react';
import CreditSummary  from './CreditSummary';

const LoanCalculatorPage = () => (
    <div className="page-content">
        <h1>Loan Calculator</h1>
        <p>This tool is under construction. Check back soon for powerful loan calculation features!</p>
    </div>
);

const ComplianceCheckerPage = () => (
    <div className="page-content">
        <h1>Compliance Checker</h1>
        <p>Our compliance checker tool is coming soon. Stay tuned!</p>
    </div>
);

const ReportingSuitePage = () => (
    <div className="page-content">
        <h1>Reporting Suite</h1>
        <p>Generate insightful reports with our upcoming reporting suite.</p>
    </div>
);

const HomePage = ({ setCurrentPage }) => (
    <div className="page-content">
        <header className="hero-section">
            <h1 className="hero-title">
                Streamline Your Credit Union Operations
            </h1>
            <p className="hero-subtitle">
                A suite of powerful, easy-to-use tools designed specifically for the challenges and needs of modern credit unions.
            </p>
            <div className="hero-cta">
                <button
                    onClick={() => setCurrentPage('loanCalculator')}
                    className="cta-button"
                >
                    Explore Tools
                </button>
            </div>
        </header>

        <section className="features-section">
            <h2 className="section-title">Our Toolkit</h2>
            <p className="section-subtitle">Everything you need, all in one place.</p>
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon-wrapper">
                         <Calculator size={24} />
                    </div>
                    <h3>Credit Summary decision tool</h3>
                    <p>Quickly calculate loan payments, create amortization schedules, and more.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon-wrapper">
                        <ShieldCheck size={24} />
                    </div>
                    <h3>Compliance Checkers</h3>
                    <p>Stay up-to-date with the latest regulations and ensure full compliance.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon-wrapper">
                        <BarChart2 size={24} />
                    </div>
                    <h3>Member Reporting</h3>
                    <p>Generate insightful reports on member data, trends, and demographics.</p>
                </div>
            </div>
        </section>
    </div>
);

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'loanCalculator':
                return <CreditSummary/>;
            case 'complianceChecker':
                return <ComplianceCheckerPage />;
            case 'reportingSuite':
                return <ReportingSuitePage />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    const NavLink = ({ page, icon, children }) => (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page);
                setIsSidebarOpen(false);
            }}
            className={`nav-link ${currentPage === page ? 'active' : ''}`}
        >
            {icon}
            <span>{children}</span>
        </a>
    );

    const sidebarContent = (
        <>
            <div className="sidebar-header">
                <h2>CU Tools</h2>
                <p>For Credit Union Professionals</p>
            </div>
            <nav className="sidebar-nav">
                <NavLink page="home" icon={<Home size={20} />}>
                    Home
                </NavLink>
                <NavLink page="loanCalculator" icon={<Calculator size={20} />}>
                    Loan Calculator
                </NavLink>
                <NavLink page="complianceChecker" icon={<ShieldCheck size={20} />}>
                    Compliance Checker
                </NavLink>
                 <NavLink page="reportingSuite" icon={<BarChart2 size={20} />}>
                    Reporting Suite
                </NavLink>
            </nav>
            <div className="sidebar-footer">
                <p>&copy; 2024 Credit Union Tools</p>
            </div>
        </>
    );

    return (
        <div className="app-container">
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                {sidebarContent}
            </aside>

            <div className="main-content">
                <header className="mobile-header">
                    <h1>Credit Union Tools</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="menu-button">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </header>

                <main>
                    {renderPage()}
                </main>
            </div>
            
            <style>{`
              /* --- General Styles & Reset --- */
              :root {
                --primary-blue: #2563eb;
                --primary-blue-hover: #1d4ed8;
                --light-gray: #f3f4f6;
                --medium-gray: #e5e7eb;
                --dark-gray: #4b5563;
                --text-color: #1f2937;
                --text-light: #6b7280;
                --sidebar-width: 18rem; /* 288px */
              }

              body {
                margin: 0;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                background-color: var(--light-gray);
                color: var(--text-color);
              }

              * {
                box-sizing: border-box;
              }

              h1, h2, h3 {
                margin: 0;
              }

              /* --- Animation --- */
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }

              .page-content {
                animation: fadeIn 0.5s ease-out forwards;
                padding: 1rem;
              }

              /* --- Layout --- */
              .app-container {
                min-height: 100vh;
              }

              .sidebar {
                position: fixed;
                top: 0;
                left: 0;
                height: 100%;
                width: var(--sidebar-width);
                background-color: white;
                border-right: 1px solid var(--medium-gray);
                display: flex;
                flex-direction: column;
                transform: translateX(-100%);
                transition: transform 0.3s ease-in-out;
                z-index: 40;
              }
              
              .main-content {
                transition: margin-left 0.3s ease-in-out;
              }
              
              main {
                padding: 1rem;
              }

              /* --- Sidebar --- */
              .sidebar-header {
                padding: 1.25rem 1.5rem;
                border-bottom: 1px solid var(--medium-gray);
              }
              .sidebar-header h2 {
                font-size: 1.5rem;
                font-weight: 700;
              }
              .sidebar-header p {
                font-size: 0.875rem;
                color: var(--text-light);
                margin: 0;
              }
              .sidebar-nav {
                flex: 1;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
              }
              .nav-link {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                font-weight: 500;
                color: var(--dark-gray);
                text-decoration: none;
                transition: color 0.2s, background-color 0.2s;
              }
              .nav-link:hover {
                background-color: var(--light-gray);
              }
              .nav-link.active {
                background-color: var(--primary-blue);
                color: white;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }
              .sidebar-footer {
                padding: 1rem;
                border-top: 1px solid var(--medium-gray);
                text-align: center;
                font-size: 0.75rem;
                color: #9ca3af;
              }
              
              /* --- Mobile Header --- */
              .mobile-header {
                position: sticky;
                top: 0;
                background-color: white;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem;
                z-index: 20;
              }
              .mobile-header h1 {
                font-size: 1.25rem;
                font-weight: 700;
              }
              .menu-button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 0.375rem;
              }
              .menu-button:focus {
                  outline: 2px solid var(--primary-blue);
              }

              /* --- Home Page --- */
              .hero-section {
                text-align: center;
                padding: 4rem 1rem;
                background-color: #f9fafb;
                border-radius: 0.75rem;
                border: 1px solid var(--medium-gray);
              }
              .hero-title {
                font-size: 2.5rem;
                font-weight: 800;
                letter-spacing: -0.025em;
              }
              .hero-subtitle {
                margin-top: 1rem;
                max-width: 42rem;
                margin-left: auto;
                margin-right: auto;
                font-size: 1.125rem;
                color: var(--text-light);
              }
              .hero-cta {
                margin-top: 2rem;
              }
              .cta-button {
                background-color: var(--primary-blue);
                color: white;
                font-weight: 600;
                padding: 0.75rem 2rem;
                border: none;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                cursor: pointer;
                transition: all 0.3s;
              }
              .cta-button:hover {
                background-color: var(--primary-blue-hover);
                transform: scale(1.05);
              }
              .features-section {
                margin-top: 4rem;
              }
              .section-title {
                font-size: 2rem;
                font-weight: 700;
                text-align: center;
              }
              .section-subtitle {
                margin-top: 0.5rem;
                text-align: center;
                color: var(--text-light);
              }
              .features-grid {
                margin-top: 3rem;
                display: grid;
                gap: 2rem;
              }
              .feature-card {
                padding: 2rem;
                background-color: white;
                border-radius: 0.75rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                border: 1px solid #f9fafb;
                transition: box-shadow 0.3s;
              }
              .feature-card:hover {
                box-shadow: 0 10px 15px rgba(0,0,0,0.1);
              }
              .feature-icon-wrapper {
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
                background-color: #dbeafe;
                color: var(--primary-blue);
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .feature-card h3 {
                margin-top: 1.25rem;
                font-size: 1.25rem;
                font-weight: 600;
              }
              .feature-card p {
                margin-top: 0.5rem;
                color: var(--text-light);
              }

              /* --- Placeholder Pages --- */
              .page-content h1 {
                font-size: 2.25rem;
                font-weight: 700;
              }
              .page-content p {
                 margin-top: 1rem;
                 color: var(--dark-gray);
              }
              
              /* --- Responsive Design --- */

              /* Mobile Sidebar Overlay */
              .sidebar-overlay {
                position: fixed;
                inset: 0;
                background-color: rgba(0,0,0,0.5);
                z-index: 30;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease-in-out;
              }
              .sidebar-overlay.visible {
                opacity: 1;
                pointer-events: auto;
              }
              .sidebar.open {
                transform: translateX(0);
              }


              @media (min-width: 768px) {
                  .page-content { padding: 2rem; }
                  .hero-title { font-size: 3rem; }
                  .features-grid { grid-template-columns: repeat(2, 1fr); }
              }

              @media (min-width: 1024px) {
                .sidebar { transform: translateX(0); }
                .main-content { margin-left: var(--sidebar-width); }
                .mobile-header { display: none; }
                .sidebar-overlay { display: none; }
                .features-grid { grid-template-columns: repeat(3, 1fr); }
              }
            `}</style>
        </div>
    );
}

