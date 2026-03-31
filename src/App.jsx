import React, { useState, useEffect, useRef } from "react";

const COLORS = {
    bg: "#0a0e13",
    surface: "#111820",
    surfaceHover: "#182030",
    border: "#1e2d40",
    accent: "#00d4ff",
    accentDim: "#0099bb",
    green: "#39ff7a",
    text: "#e2eaf5",
    muted: "#6a8099",
    white: "#ffffff",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;600;700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'Sora', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.accent}; border-radius: 2px; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(10,14,19,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${COLORS.border};
    padding: 0 5%;
    display: flex; align-items: center; justify-content: space-between;
    height: 60px;
  }
  .nav-logo {
    font-family: 'Space Mono', monospace;
    color: ${COLORS.accent};
    font-size: 1rem;
    letter-spacing: 2px;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-link {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${COLORS.muted};
    cursor: pointer;
    background: none; border: none;
    transition: color 0.2s;
    padding: 0;
  }
  .nav-link:hover, .nav-link.active { color: ${COLORS.accent}; }
  .nav-link.active {
    border-bottom: 1px solid ${COLORS.accent};
    padding-bottom: 2px;
  }

  /* LAYOUT */
  .page { min-height: 100vh; padding: 100px 5% 60px; max-width: 1100px; margin: 0 auto; }

  /* HERO */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    min-height: calc(100vh - 160px);
  }
  @media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr; text-align: center; } }

  .hero-tag {
    display: inline-block;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: ${COLORS.green};
    background: rgba(57,255,122,0.08);
    border: 1px solid rgba(57,255,122,0.3);
    padding: 4px 12px;
    border-radius: 2px;
    margin-bottom: 1.5rem;
    letter-spacing: 2px;
  }
  .hero-name {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    color: ${COLORS.white};
    margin-bottom: 1rem;
  }
  .hero-name span { color: ${COLORS.accent}; }
  .hero-catchphrase {
    font-size: 1rem;
    color: ${COLORS.muted};
    font-style: italic;
    margin-bottom: 2rem;
    max-width: 420px;
  }
  .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }

  .hero-visual {
    display: flex; justify-content: center; align-items: center;
    position: relative;
  }
  .avatar-ring {
    width: 220px; height: 220px; border-radius: 50%;
    border: 2px solid ${COLORS.accent};
    padding: 6px;
    position: relative;
    animation: spin-ring 12s linear infinite;
  }
  @keyframes spin-ring {
    0% { box-shadow: 0 0 0 0 rgba(0,212,255,0.3); }
    50% { box-shadow: 0 0 30px 4px rgba(0,212,255,0.2); }
    100% { box-shadow: 0 0 0 0 rgba(0,212,255,0.3); }
  }
  .avatar-img {
    width: 100%; height: 100%; border-radius: 50%;
    object-fit: cover; background: ${COLORS.surface};
    display: flex; align-items: center; justify-content: center;
    font-size: 4rem;
  }
  .hero-stats {
    margin-top: 2rem;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
  }
  .stat-box {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 6px;
    padding: 1rem;
    text-align: center;
  }
  .stat-num {
    font-family: 'Space Mono', monospace;
    font-size: 1.5rem;
    color: ${COLORS.accent};
    font-weight: 700;
  }
  .stat-label { font-size: 0.7rem; color: ${COLORS.muted}; text-transform: uppercase; letter-spacing: 1px; }

  /* BUTTONS */
  .btn {
    padding: 0.7rem 1.5rem;
    border-radius: 4px;
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    letter-spacing: 1px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s;
    border: none;
  }
  .btn-primary {
    background: ${COLORS.accent};
    color: ${COLORS.bg};
    font-weight: 700;
  }
  .btn-primary:hover { background: white; transform: translateY(-2px); }
  .btn-outline {
    background: transparent;
    border: 1px solid ${COLORS.accent};
    color: ${COLORS.accent};
  }
  .btn-outline:hover { background: rgba(0,212,255,0.08); transform: translateY(-2px); }

  /* SECTION TITLES */
  .section-header { margin-bottom: 3rem; }
  .section-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    color: ${COLORS.accent};
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  .section-title {
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 700;
    color: ${COLORS.white};
  }
  .section-title span { color: ${COLORS.accent}; }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(460px, 1fr)); gap: 1.5rem; }
  @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr; } }

  .project-card {
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    padding: 1.8rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .project-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 3px; height: 100%;
    background: ${COLORS.accent};
    transform: scaleY(0);
    transition: transform 0.3s;
    transform-origin: bottom;
  }
  .project-card:hover::before { transform: scaleY(1); }
  .project-card:hover {
    border-color: rgba(0,212,255,0.3);
    background: ${COLORS.surfaceHover};
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
  .project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem; }
  .project-name {
    font-size: 1.2rem; font-weight: 700; color: ${COLORS.white};
    font-family: 'Space Mono', monospace;
  }
  .project-category {
    font-size: 0.65rem; font-family: 'Space Mono', monospace;
    color: ${COLORS.green}; background: rgba(57,255,122,0.08);
    border: 1px solid rgba(57,255,122,0.25);
    padding: 2px 8px; border-radius: 2px; letter-spacing: 1px; text-transform: uppercase;
    white-space: nowrap;
  }
  .project-desc { color: ${COLORS.muted}; font-size: 0.9rem; margin-bottom: 1.2rem; line-height: 1.7; }
  .project-tech { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.2rem; }
  .tech-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem; color: ${COLORS.accent};
    background: rgba(0,212,255,0.06);
    border: 1px solid rgba(0,212,255,0.2);
    padding: 2px 10px; border-radius: 2px;
  }
  .project-footer { display: flex; align-items: center; justify-content: space-between; }
  .project-link {
    font-family: 'Space Mono', monospace; font-size: 0.75rem;
    color: ${COLORS.accent}; text-decoration: none; letter-spacing: 1px;
    transition: color 0.2s;
  }
  .project-link:hover { color: white; }

  /* EXPANDED PROJECT DETAILS */
  .project-details {
    margin-top: 1rem; padding-top: 1rem;
    border-top: 1px solid ${COLORS.border};
    animation: fadeIn 0.3s ease;
  }
  .project-highlights { list-style: none; }
  .project-highlights li {
    font-size: 0.85rem; color: ${COLORS.muted};
    padding: 0.3rem 0;
    display: flex; align-items: flex-start; gap: 0.6rem;
  }
  .project-highlights li::before { content: '▸'; color: ${COLORS.accent}; flex-shrink: 0; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

  /* SKILLS */
  .skills-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
  @media (max-width: 768px) { .skills-layout { grid-template-columns: 1fr; } }

  .skill-item { margin-bottom: 1.8rem; }
  .skill-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; }
  .skill-name { font-size: 0.9rem; font-weight: 600; color: ${COLORS.text}; }
  .skill-level-badge {
    font-family: 'Space Mono', monospace; font-size: 0.65rem;
    padding: 2px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px;
  }
  .level-beginner { color: #ff9f43; background: rgba(255,159,67,0.08); border: 1px solid rgba(255,159,67,0.3); }
  .level-intermediate { color: ${COLORS.accent}; background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.3); }
  .level-advanced { color: ${COLORS.green}; background: rgba(57,255,122,0.08); border: 1px solid rgba(57,255,122,0.3); }
  .skill-bar-track {
    height: 4px; background: ${COLORS.border}; border-radius: 2px; overflow: hidden;
  }
  .skill-bar-fill {
    height: 100%; border-radius: 2px;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
    background: linear-gradient(90deg, ${COLORS.accentDim}, ${COLORS.accent});
  }
  .skill-bar-fill.advanced { background: linear-gradient(90deg, #1fbb5a, ${COLORS.green}); }
  .skill-bar-fill.beginner { background: linear-gradient(90deg, #cc7a00, #ff9f43); }
  .skill-projects { font-size: 0.75rem; color: ${COLORS.muted}; margin-top: 0.4rem; }
  .skill-projects span { color: ${COLORS.accent}; cursor: pointer; }
  .skill-notes-toggle { font-size: 0.75rem; color: ${COLORS.muted}; margin-top: 0.4rem; font-style: italic; }

  .tech-categories { display: flex; flex-direction: column; gap: 1.5rem; }
  .tech-category-title {
    font-family: 'Space Mono', monospace; font-size: 0.7rem;
    color: ${COLORS.accent}; letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 0.8rem;
  }
  .tech-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .tech-pill {
    padding: 6px 14px; border-radius: 20px;
    font-size: 0.8rem; background: ${COLORS.surface};
    border: 1px solid ${COLORS.border}; color: ${COLORS.text};
    transition: all 0.2s;
  }
  .tech-pill:hover { border-color: ${COLORS.accent}; color: ${COLORS.accent}; background: rgba(0,212,255,0.05); }

  /* CV */
  .cv-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; }
  @media (max-width: 768px) { .cv-layout { grid-template-columns: 1fr; } }

  .cv-section { margin-bottom: 2.5rem; }
  .cv-section-title {
    font-family: 'Space Mono', monospace; font-size: 0.7rem;
    color: ${COLORS.accent}; letter-spacing: 3px; text-transform: uppercase;
    margin-bottom: 1.2rem; padding-bottom: 0.5rem;
    border-bottom: 1px solid ${COLORS.border};
  }
  .cv-entry { margin-bottom: 1.5rem; }
  .cv-entry-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.3rem; }
  .cv-entry-title { font-weight: 700; color: ${COLORS.white}; font-size: 1rem; }
  .cv-entry-company { color: ${COLORS.accent}; font-size: 0.9rem; }
  .cv-entry-date {
    font-family: 'Space Mono', monospace; font-size: 0.7rem;
    color: ${COLORS.muted}; white-space: nowrap;
  }
  .cv-entry-desc { font-size: 0.88rem; color: ${COLORS.muted}; margin-top: 0.3rem; }

  .cv-sidebar-card {
    background: ${COLORS.surface}; border: 1px solid ${COLORS.border};
    border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;
  }
  .cv-sidebar-title { font-size: 0.85rem; font-weight: 700; color: ${COLORS.white}; margin-bottom: 1rem; }

  /* CONTACT */
  .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  @media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; } }

  .contact-intro { font-size: 0.95rem; color: ${COLORS.muted}; margin-bottom: 2rem; line-height: 1.8; }
  .contact-link-row {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem; border: 1px solid ${COLORS.border};
    border-radius: 6px; margin-bottom: 1rem;
    text-decoration: none; color: ${COLORS.text};
    background: ${COLORS.surface};
    transition: all 0.2s;
  }
  .contact-link-row:hover { border-color: ${COLORS.accent}; transform: translateX(4px); }
  .contact-link-icon { font-size: 1.3rem; }
  .contact-link-label { font-size: 0.8rem; color: ${COLORS.muted}; font-family: 'Space Mono', monospace; text-transform: uppercase; letter-spacing: 1px; }
  .contact-link-value { font-size: 0.9rem; color: ${COLORS.accent}; }

  .form-group { margin-bottom: 1.2rem; }
  .form-label {
    display: block; font-family: 'Space Mono', monospace;
    font-size: 0.7rem; color: ${COLORS.muted}; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .form-input, .form-textarea {
    width: 100%; padding: 0.8rem 1rem;
    background: ${COLORS.surface}; border: 1px solid ${COLORS.border};
    border-radius: 4px; color: ${COLORS.text};
    font-family: 'Sora', sans-serif; font-size: 0.9rem;
    transition: border-color 0.2s; outline: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: ${COLORS.accent}; }
  .form-textarea { resize: vertical; min-height: 140px; }
  .form-success {
    padding: 1rem; background: rgba(57,255,122,0.08);
    border: 1px solid rgba(57,255,122,0.3); border-radius: 4px;
    color: ${COLORS.green}; font-size: 0.9rem; text-align: center;
    font-family: 'Space Mono', monospace;
  }

  /* TERMINAL ANIMATION */
  .terminal-cursor {
    display: inline-block; width: 2px; height: 1em;
    background: ${COLORS.accent}; margin-left: 2px;
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }
  @keyframes blink { 50% { opacity: 0; } }

  /* FOOTER */
  .footer {
    border-top: 1px solid ${COLORS.border};
    padding: 1.5rem 5%; text-align: center;
    font-family: 'Space Mono', monospace; font-size: 0.7rem;
    color: ${COLORS.muted};
  }
  .footer span { color: ${COLORS.accent}; }

  /* FADE IN ANIMATION */
  .fade-up {
    opacity: 0; transform: translateY(24px);
    animation: fadeUp 0.6s ease forwards;
  }
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

  /* MOBILE NAV */
  @media (max-width: 600px) {
    .nav-links { gap: 1rem; }
    .nav-link { font-size: 0.65rem; letter-spacing: 0; }
    .hero-stats { grid-template-columns: repeat(3, 1fr); }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
    {
        id: "etodo",
        name: "etodo",
        category: "Full-Stack",
        desc: "A full-stack task management app built with React and Express. Supports creating, completing, and deleting tasks with persistent data storage.",
        tech: ["React", "Express", "JavaScript", "CSS", "Cookies"],
        link: "https://github.com/malek1507/project-ep/tree/fc7e1fb631f7493fc9db02b7f53dc00686cf4e3a/etodo2",
        highlights: [
            "Designed RESTful API endpoints with Express for CRUD operations",
            "Built responsive React UI with hooks for state management",
            "Used HTTP cookies for secure session token storage and authentication",
            "Structured codebase following component-based architecture",
        ],
    },
    {
        id: "hungame",
        name: "Hungame",
        category: "Game Dev",
        desc: "A Hangman game built in Python using Pygame, featuring multiple difficulty levels, a fun animated interface, and a word bank system.",
        tech: ["Python", "Pygame"],
        link: "https://github.com/malek1507/project-ep/tree/607a8709f01c63045e36f89d0dccb6e5a9655c08/hangman",
        highlights: [
            "Implemented game loop with event handling and rendering via Pygame",
            "Created 3 difficulty levels with scaled word complexity",
            "Designed scoring system and win/loss state management",
            "Built animated gallows drawing using vector graphics",
        ],
    },
    {
        id: "degital-resume",
        name: "Digital Resume",
        category: "Frontend",
        desc: "A clean, semantic digital resume built entirely in HTML and CSS. First portfolio project focusing on layout, typography, and print styles.",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/malek1507/project-ep/tree/5de7c90a25472e925113ffb157a97118493e60d3/resume",
        highlights: [
            "Applied semantic HTML5 elements for accessibility and SEO",
            "Used CSS Flexbox and Grid for multi-column layout",
            "Added print stylesheet for physical/PDF output",
            "Mobile-first responsive design approach",
        ],
    },
    {
        id: "adm",
        name: "ADM — All Debates Matter",
        category: "Full-Stack / Product Design",
        desc: "A structured debate platform where users post topics and argue PRO, NEUTRAL, or CON. Features a full reputation system, upvote/downvote on arguments, debate following, and a trending feed. Built for Epitech's Product Design module.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST API"],
        link: "https://github.com/malek1507/project-ep/tree/681d768f4abe887290427fd7b2944a8f960ff5de/ADM",
        highlights: [
            "Designed the full product from scratch: user research, personas, wireframes, mockups, and Figma prototype before writing a single line of code",
            "Built a 3-column debate layout (PRO / NEUTRAL / CON) with Reddit-style upvote/downvote voting and vote toggling",
            "Implemented a reputation system — users gain points when their arguments receive upvotes",
            "Added debate following so users can track ongoing discussions and see live argument counts",
            "Trending feed surfaces the most active debates sorted by total argument count",
            "Authentication with user profiles, avatars, and per-user vote state tracked server-side",
        ],
    },
    {
        name: "TARDIS",
        category: "Data Science / ML",
        desc: "SNCF train delay predictor built for Epitech's B-DAT-200 module. Analyzes historical delay data, uncovers seasonal patterns, and forecasts delays using a Random Forest model served through an interactive Streamlit dashboard.",
        tech: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Matplotlib", "Joblib"],
        link: "https://github.com/malek1507",
        highlights: [
            "Cleaned and engineered features from raw SNCF dataset — extracted month, year, trimestre, and cancellation rate",
            "Compared 3 models: Linear Regression, Random Forest, Gradient Boosting — Random Forest won with RMSE 2.70 and R² of 0.51",
            "Built an interactive Streamlit dashboard with route selector, date picker, historical stats, and live AI prediction",
            "Encoded categorical station data with LabelEncoder and used median imputation for missing features at prediction time",
            "Color-coded prediction output: green < 5 min, orange 5–15 min, red 15+ min for instant readability",
        ],
    },
    {
        id: "nextbuy",
        name: "NextBuy",
        category: "Data Science / ML",
        desc: "Grocery order analysis for Epitech's B-DAT module. Explores millions of real-world orders to surface actionable business insights, then builds and compares predictive ML models for reorder behaviour.",
        tech: ["Python", "Jupyter Notebook", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
        link: "https://github.com/malek1507/project-ep/tree/948ff280c09ed2b58f3a61f016e64acac94e6673/nextbuy",
        highlights: [
            "Preprocessed and merged multiple datasets (orders, products, aisles, departments) into a unified analysis-ready dataframe",
            "Defined 8+ business insight questions and answered each with targeted statistics and visualisations",
            "Used diverse chart types — bar, heatmap, distribution, scatter — following Tufte's data-ink principles",
            "Trained, evaluated, and compared at least 2 ML models to predict product reorder probability",
            "Engineered features such as reorder rate per product, order frequency per user, and cart position signals",
            "Delivered a fully reproducible notebook runnable on any machine with clear methodology explanations",
        ],
    },
    {
        id: "owasp-juice-shop",
        name: "OWASP Juice Shop",
        category: "Cybersecurity",
        desc: "Security audit and exploitation of the intentionally vulnerable OWASP Juice Shop application. Identified and documented multiple OWASP Top 10 vulnerabilities.",
        tech: ["Burp Suite", "DevTools", "JavaScript", "OWASP Top 10"],
        link: "https://github.com/malek1507/project-ep/tree/8fe2692552d7a24fb6c6ccf783cf28c6662c8fa2/cybersecurity",
        highlights: [
            "Identified SQL injection, XSS, and broken access control flaws",
            "Used Burp Suite to intercept and manipulate HTTP requests",
            "Documented vulnerabilities with CVSS severity ratings",
            "Proposed mitigations aligned with OWASP remediation guidelines",
        ],
    },
];

const skills = [
    {
        name: "Configure Work Environment",
        frenchName: "Installer et configurer son environnement de travail",
        level: "Advanced",
        pct: 80,
        projects: ["etodo", "hungame", "Digital Resume"],
        notes: "Node.js/React setup, Python/Pygame, npm scripting, IDE configuration.",
    },
    {
        name: "Develop User Interfaces",
        frenchName: "Développer des interfaces utilisateur",
        level: "Advanced",
        pct: 82,
        projects: ["etodo", "Digital Resume", "OWASP Juice Shop"],
        notes: "HTML, CSS, JS, React. Semantic markup, BEM, responsive design.",
    },
    {
        name: "Application Logic / Business Components",
        frenchName: "Développer des composants métier",
        level: "Intermediate",
        pct: 55,
        projects: ["etodo", "hungame"],
        notes: "Task management logic, game states, difficulty scaling.",
    },
    {
        name: "Database Design",
        frenchName: "Concevoir une base de données",
        level: "Intermediate",
        pct: 50,
        projects: ["etodo"],
        notes: "Local storage persistence, data retrieval basics.",
    },
    {
        name: "Testing & QA",
        frenchName: "Préparer et exécuter les plans de tests",
        level: "Intermediate",
        pct: 50,
        projects: ["hungame", "OWASP Juice Shop"],
        notes: "Game logic testing, front-end interaction testing, security testing.",
    },
    {
        name: "DevOps & Deployment",
        frenchName: "Contribuer à la mise en production",
        level: "Advanced",
        pct: 75,
        projects: ["etodo"],
        notes: "GitHub version control, deployment basics, project documentation.",
    },
];

const techStack = {
    Languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
    "Frameworks & Libraries": ["React", "Next.js", "Express.js", "Pygame"],
    "Tools & Platforms": ["Git", "GitHub", "Burp Suite", "Node.js", "npm"],
    Security: ["OWASP Top 10", "DevTools", "XSS", "SQL Injection", "Burp Suite"],
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function TypeWriter({ text, speed = 40 }) {
    const [displayed, setDisplayed] = useState("");
    useEffect(() => {
        setDisplayed("");
        let i = 0;
        const iv = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(iv);
        }, speed);
        return () => clearInterval(iv);
    }, [text]);
    return (
        <span>
            {displayed}
            {displayed.length < text.length && <span className="terminal-cursor" />}
        </span>
    );
}

function SkillBar({ pct, level, animate }) {
    const cls = level === "Advanced" ? "advanced" : level === "Beginner" ? "beginner" : "";
    return (
        <div className="skill-bar-track">
            <div
                className={`skill-bar-fill ${cls}`}
                style={{ width: animate ? `${pct}%` : "0%" }}
            />
        </div>
    );
}

function ProjectCard({ project }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="project-card" onClick={() => setExpanded(!expanded)}>
            <div className="project-header">
                <span className="project-name">{project.name}</span>
                <span className="project-category">{project.category}</span>
            </div>
            <p className="project-desc">{project.desc}</p>
            <div className="project-tech">
                {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
            </div>
            <div className="project-footer">
                <a className="project-link" href={project.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
                    ↗ GitHub Repo
                </a>
                <span style={{ fontSize: "0.75rem", color: COLORS.muted, fontFamily: "'Space Mono', monospace" }}>
                    {expanded ? "▲ hide" : "▼ details"}
                </span>
            </div>
            {expanded && (
                <div className="project-details">
                    <ul className="project-highlights">
                        {project.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

function Home({ setPage }) {
    return (
        <div className="page fade-up">
            <div className="hero-grid">
                <div>
                    <div className="hero-tag">▸ AVAILABLE FOR OPPORTUNITIES</div>
                    <h1 className="hero-name">
                        Malek<br /><span>Darouazi</span>
                    </h1>
                    <p className="hero-catchphrase">
                        <TypeWriter text="Crafting secure digital experiences with clean code and architectural logic." />
                    </p>
                    <p style={{ fontSize: "0.85rem", color: COLORS.muted, marginBottom: "2rem", fontFamily: "'Space Mono', monospace" }}>
                        Junior Web Developer · Cybersecurity Enthusiast
                    </p>
                    <div className="hero-cta">
                        <button className="btn btn-primary" onClick={() => setPage("cv")}>Download CV</button>
                        <button className="btn btn-outline" onClick={() => setPage("contact")}>Get In Touch</button>
                    </div>
                </div>
                <div className="hero-visual" style={{ flexDirection: "column" }}>
                    <div className="avatar-ring">
                        <img
                            src="../assets/img/PXL_20250930_084531778.jpg"
                            alt="Malek Darouazi"
                            className="avatar-img"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="hero-stats">
                        {[["6", "Projects"], ["2", "Languages"], ["6", "Skills"]].map(([n, l]) => (
                            <div className="stat-box" key={l}>
                                <div className="stat-num">{n}</div>
                                <div className="stat-label">{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "4rem" }}>
                <div className="section-header">
                    <p className="section-eyebrow">// featured work</p>
                    <h2 className="section-title">Selected <span>Projects</span></h2>
                </div>
                <div className="projects-grid">
                    {projects.slice(0, 2).map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <button className="btn btn-outline" onClick={() => setPage("projects")}>View All Projects →</button>
                </div>
            </div>
        </div>
    );
}

function Projects() {
    return (
        <div className="page fade-up">
            <div className="section-header">
                <p className="section-eyebrow">// work</p>
                <h2 className="section-title">All <span>Projects</span></h2>
            </div>
            <p style={{ color: COLORS.muted, marginBottom: "2rem", fontSize: "0.9rem" }}>
                Click any card to expand details.
            </p>
            <div className="projects-grid">
                {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
        </div>
    );
}

function Skills() {
    const [animate, setAnimate] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const t = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(t);
    }, []);

    const levelClass = (l) =>
        l === "Advanced" ? "level-advanced" : l === "Beginner" ? "level-beginner" : "level-intermediate";

    return (
        <div className="page fade-up" ref={ref}>
            <div className="section-header">
                <p className="section-eyebrow">// competencies</p>
                <h2 className="section-title">Skills &amp; <span>Expertise</span></h2>
            </div>
            <div className="skills-layout">
                <div>
                    <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: COLORS.accent, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                        Professional Skills
                    </h3>
                    {skills.map((s) => (
                        <div className="skill-item" key={s.name}>
                            <div className="skill-header">
                                <span className="skill-name">{s.name}</span>
                                <span className={`skill-level-badge ${levelClass(s.level)}`}>{s.level}</span>
                            </div>
                            <SkillBar pct={s.pct} level={s.level} animate={animate} />
                            <div className="skill-projects">
                                {s.projects.join(" · ")}
                            </div>
                            <div className="skill-notes-toggle">{s.notes}</div>
                        </div>
                    ))}
                </div>
                <div className="tech-categories">
                    {Object.entries(techStack).map(([cat, pills]) => (
                        <div key={cat}>
                            <div className="tech-category-title">{cat}</div>
                            <div className="tech-pills">
                                {pills.map((p) => <span key={p} className="tech-pill">{p}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CV() {
    return (
        <div className="page fade-up">
            <div className="section-header">
                <p className="section-eyebrow">// resume</p>
                <h2 className="section-title">Curriculum <span>Vitae</span></h2>
            </div>
            <div className="cv-layout">
                <div>
                    <div className="cv-section">
                        <div className="cv-section-title">Education</div>
                        <div className="cv-entry">
                            <div className="cv-entry-header">
                                <div>
                                    <div className="cv-entry-title">Bachelor in Web Development</div>
                                    <div className="cv-entry-company">Epitech</div>
                                </div>
                                <span className="cv-entry-date">2025 – 2028</span>
                            </div>
                            <div className="cv-entry-desc">
                                Hands-on program focused on full-stack development, cybersecurity fundamentals, and professional project delivery. Coursework covers React, Express, Python, and secure coding practices.
                            </div>
                        </div>
                    </div>

                    <div className="cv-section">
                        <div className="cv-section-title">Projects</div>
                        {projects.map((p) => (
                            <div className="cv-entry" key={p.id}>2025
                                <div className="cv-entry-header">
                                    <div>
                                        <div className="cv-entry-title">{p.name}</div>
                                        <div className="cv-entry-company">{p.category}</div>
                                    </div>
                                </div>
                                <div className="cv-entry-desc">{p.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="cv-sidebar-card">
                        <div className="cv-sidebar-title">Download</div>
                        <a
                            href="../assets/cv/Malek-Darouazi-FlowCV-Resume-20251220.pdf"
                            target="_blank"
                            download
                            className="btn btn-primary"
                            style={{ width: "100%", textAlign: "center", display: "block" }}
                        >
                            ↓ Download PDF
                        </a>
                    </div>
                    <div className="cv-sidebar-card">
                        <div className="cv-sidebar-title">Links</div>
                        <a href="https://github.com/malek1507" target="_blank" rel="noreferrer" className="contact-link-row" style={{ marginBottom: "0.8rem" }}>
                            <span className="contact-link-icon">⌥</span>
                            <div>
                                <div className="contact-link-label">GitHub</div>
                                <div className="contact-link-value">@malek1507</div>
                            </div>
                        </a>
                        <a href="https://www.linkedin.com/in/malek-darouazi-773997394" target="_blank" rel="noreferrer" className="contact-link-row">
                            <span className="contact-link-icon">in</span>
                            <div>
                                <div className="contact-link-label">LinkedIn</div>
                                <div className="contact-link-value">malek-darouazi</div>
                            </div>
                        </a>
                    </div>
                    <div className="cv-sidebar-card">
                        <div className="cv-sidebar-title">Tech Stack</div>
                        <div className="tech-pills" style={{ flexDirection: "column", gap: "0.4rem" }}>
                            {["React", "Express.js", "Python", "JavaScript", "HTML/CSS", "Git", "Burp Suite"].map((t) => (
                                <span key={t} className="tech-pill" style={{ fontSize: "0.8rem" }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("https://formspree.io/f/xzdkpydp", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
            });
            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="page fade-up">
            <div className="section-header">
                <p className="section-eyebrow">// reach out</p>
                <h2 className="section-title">Get In <span>Touch</span></h2>
            </div>
            <div className="contact-layout">
                <div>
                    <p className="contact-intro">
                        I'm currently open to junior developer roles and cybersecurity internships. Whether you have a project, opportunity, or just want to connect — drop me a message.
                    </p>
                    <a href="mailto:malek.darouazi@epitech.eu" className="contact-link-row">
                        <span className="contact-link-icon">✉</span>
                        <div>
                            <div className="contact-link-label">Email</div>
                            <div className="contact-link-value">malek.darouazi@epitech.eu</div>
                        </div>
                    </a>
                    <a href="https://github.com/malek1507" target="_blank" rel="noreferrer" className="contact-link-row">
                        <span className="contact-link-icon">⌥</span>
                        <div>
                            <div className="contact-link-label">GitHub</div>
                            <div className="contact-link-value">@malek1507</div>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/malek-darouazi-773997394" target="_blank" rel="noreferrer" className="contact-link-row">
                        <span className="contact-link-icon">in</span>
                        <div>
                            <div className="contact-link-label">LinkedIn</div>
                            <div className="contact-link-value">malek-darouazi</div>
                        </div>
                    </a>
                </div>
                <div>
                    {status === "success" ? (
                        <div className="form-success">
                            ✓ Message received — Malek will get back to you shortly.
                        </div>
                    ) : (
                        <>
                            {status === "error" && (
                                <div style={{ padding: "0.8rem", marginBottom: "1rem", background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: "4px", color: "#e74c3c", fontSize: "0.85rem", fontFamily: "'Space Mono', monospace" }}>
                                    ✗ Something went wrong. Try emailing directly.
                                </div>
                            )}
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    className="form-input"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-textarea"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: "100%", opacity: status === "sending" ? 0.6 : 1 }}
                                onClick={handleSubmit}
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? "Sending..." : "Send Message →"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
    const [page, setPage] = useState("home");

    const nav = [
        { id: "home", label: "Home" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "cv", label: "CV" },
        { id: "contact", label: "Contact" },
    ];

    const pages = { home: Home, projects: Projects, skills: Skills, cv: CV, contact: Contact };
    const PageComponent = pages[page];

    return (
        <>
            <style>{styles}</style>
            <nav className="nav">
                <span className="nav-logo" onClick={() => setPage("home")}>MD_</span>
                <ul className="nav-links">
                    {nav.map((n) => (
                        <li key={n.id}>
                            <button
                                className={`nav-link ${page === n.id ? "active" : ""}`}
                                onClick={() => setPage(n.id)}
                            >
                                {n.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <PageComponent setPage={setPage} />
            <footer className="footer">
                © 2026 <span>Malek Darwouazi</span> · Built with React · <span>MD_</span>
            </footer>
        </>
    );
}