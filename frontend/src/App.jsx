import { useState, useEffect, useRef } from "react";

// Fields categorised by tabs
const fields = [
  { name: "cgpa", label: "Academic CGPA", min: 5, max: 10, icon: "🎓", step: 0.1, category: "academics" },
  { name: "projects", label: "Projects Completed", min: 0, max: 20, icon: "📁", step: 1, category: "academics" },
  { name: "internships", label: "Internships", min: 0, max: 5, icon: "🏢", step: 1, category: "academics" },

  { name: "dsa", label: "DSA Skill Level", min: 1, max: 10, icon: "🌳", step: 1, category: "tech" },
  { name: "ml", label: "Machine Learning / AI", min: 1, max: 10, icon: "🧠", step: 1, category: "tech" },
  { name: "webdev", label: "Web Development", min: 1, max: 10, icon: "🌐", step: 1, category: "tech" },

  { name: "cloud", label: "Cloud Platforms", min: 1, max: 10, icon: "☁️", step: 1, category: "ops" },
  { name: "cybersecurity", label: "Cybersecurity", min: 1, max: 10, icon: "🔐", step: 1, category: "ops" },
  { name: "communication", label: "Communication Skill", min: 1, max: 10, icon: "💬", step: 1, category: "ops" },
];

const careerMetadata = {
  "Web Developer": {
    icon: "🌐",
    description: "Designs, builds, and maintains websites and web applications, ensuring a seamless user experience and robust technical architectures.",
    salary: "$85,000 - $125,000",
    outlook: "+16% (Very High Growth)",
    ideal: { cgpa: 8.0, dsa: 6, communication: 8, ml: 3, webdev: 9, cloud: 6, cybersecurity: 4, projects: 12, internships: 1 },
    topics: ["React / Vue / Angular", "Next.js & SSR", "Tailwind CSS & Responsive Design", "RESTful & GraphQL APIs", "State Management (Redux/Zustand)"]
  },
  "Cybersecurity Analyst": {
    icon: "🛡️",
    description: "Protects systems, networks, and data from cyber threats, unauthorized access, and malicious attacks through proactive defense mechanisms.",
    salary: "$95,000 - $145,000",
    outlook: "+32% (Explosive Growth)",
    ideal: { cgpa: 8.2, dsa: 6, communication: 7, ml: 4, webdev: 4, cloud: 6, cybersecurity: 9, projects: 8, internships: 1 },
    topics: ["Network Security & Firewalls", "Penetration Testing (Kali Linux)", "Cryptography (SSL/TLS, RSA)", "OWASP Top 10 Vulnerabilities", "SIEM Tools & Log Analysis"]
  },
  "Data Scientist": {
    icon: "📊",
    description: "Extracts deep insights from complex data, building predictive models and statistical algorithms to drive critical business decisions.",
    salary: "$110,000 - $160,000",
    outlook: "+35% (Extremely High Growth)",
    ideal: { cgpa: 8.7, dsa: 7, communication: 8, ml: 8, webdev: 4, cloud: 6, cybersecurity: 3, projects: 12, internships: 2 },
    topics: ["Advanced Statistics & Probability", "SQL & Big Data Tools (Spark)", "Pandas / NumPy / Scikit-Learn", "Data Visualization (Tableau, Seaborn)", "A/B Testing & Experimentation"]
  },
  "Cloud Engineer": {
    icon: "☁️",
    description: "Architects, implements, and maintains cloud infrastructure and server configurations, optimizing for scalability, speed, and cost.",
    salary: "$115,000 - $155,000",
    outlook: "+27% (Very High Growth)",
    ideal: { cgpa: 8.5, dsa: 6, communication: 7, ml: 4, webdev: 5, cloud: 9, cybersecurity: 7, projects: 8, internships: 1 },
    topics: ["AWS / GCP / Azure Certifications", "Docker & Kubernetes", "Infrastructure as Code (Terraform)", "Linux System Administration", "Serverless Architectures"]
  },
  "Software Developer": {
    icon: "💻",
    description: "Translates functional requirements into high-performance software, components, and platforms, adhering to coding best practices.",
    salary: "$105,000 - $150,000",
    outlook: "+25% (High Growth)",
    ideal: { cgpa: 8.8, dsa: 9, communication: 7, ml: 4, webdev: 7, cloud: 6, cybersecurity: 5, projects: 10, internships: 1 },
    topics: ["Data Structures & Algorithms", "System Design & Design Patterns", "Object-Oriented Programming (Java/C++/Go)", "Unit Testing & CI/CD", "Database Management & SQL"]
  },
  "ML Engineer": {
    icon: "🤖",
    description: "Researches, implements, and deploys production-grade Machine Learning and Deep Learning systems to solve enterprise intelligence challenges.",
    salary: "$125,000 - $185,000",
    outlook: "+40% (Hyper-growth field)",
    ideal: { cgpa: 9.1, dsa: 8, communication: 7, ml: 9, webdev: 4, cloud: 7, cybersecurity: 3, projects: 14, internships: 2 },
    topics: ["Deep Learning (PyTorch / TensorFlow)", "MLOps & Model Deployment", "Neural Network Architectures", "Feature Engineering & Data Pipelines", "GPU Computing & CUDA"]
  },
  "Mobile App Developer": {
    icon: "📱",
    description: "Creates rich user interfaces and application logic for smartphones and tablets across Android (Kotlin) and iOS (Swift) platforms.",
    salary: "$90,000 - $135,000",
    outlook: "+19% (High Growth)",
    ideal: { cgpa: 8.0, dsa: 7, communication: 6, ml: 3, webdev: 6, cloud: 6, cybersecurity: 5, projects: 12, internships: 1 },
    topics: ["React Native / Flutter / Swift", "Mobile OS Architecture", "App Store & Play Store Deployment", "Offline Sync & Local Databases", "UI/UX Mobile Design Guidelines"]
  },
  "DevOps Engineer": {
    icon: "⚙️",
    description: "Bridges software engineering and system operations, building CI/CD deployment pipelines, automated setups, and telemetry networks.",
    salary: "$110,000 - $160,000",
    outlook: "+24% (Very High Growth)",
    ideal: { cgpa: 8.4, dsa: 6, communication: 8, ml: 4, webdev: 5, cloud: 8, cybersecurity: 7, projects: 10, internships: 2 },
    topics: ["Jenkins / GitHub Actions", "Ansible / Chef Automation", "Kubernetes Orchestration", "Prometheus & Grafana Monitoring", "Bash / Python scripting"]
  }
};

const fallbackMetadata = {
  icon: "💼",
  description: "Leverages a diverse set of engineering principles to build solutions, manage databases, and coordinate development cycles.",
  salary: "$95,000 - $140,000",
  outlook: "+20% (High Growth)",
  ideal: { cgpa: 7.5, dsa: 7, communication: 7, ml: 5, webdev: 6, cloud: 6, cybersecurity: 5, projects: 10, internships: 1 },
  topics: ["Software Engineering Foundations", "Data Management & SQL", "Agile Methodologies", "Version Control (Git)"]
};

// Weighted calculation for Live Profile Strength Meter
function getProfileStrength(form) {
  const cgpaContrib = ((form.cgpa - 5) / 5) * 25; // 0 to 25
  const dsaContrib = (form.dsa / 10) * 15; // 0 to 15
  const projectsContrib = (form.projects / 20) * 15; // 0 to 15
  const internshipsContrib = (form.internships / 5) * 10; // 0 to 10
  const commContrib = (form.communication / 10) * 10; // 0 to 10
  
  // Average of advanced technical specializations
  const techSum = form.ml + form.webdev + form.cloud + form.cybersecurity;
  const techContrib = (techSum / 40) * 25; // 0 to 25
  
  const strength = Math.round(cgpaContrib + dsaContrib + projectsContrib + internshipsContrib + commContrib + techContrib);
  return Math.min(100, Math.max(0, strength));
}

// Calculate similarity / match percentage
function calculateMatchScore(userSkills, idealSkills) {
  let totalDiff = 0;
  let maxDiff = 0;

  Object.keys(idealSkills).forEach((key) => {
    const userVal = userSkills[key];
    const idealVal = idealSkills[key];

    if (key === "cgpa") {
      const diff = Math.abs(userVal - idealVal);
      totalDiff += (diff / 5) * 10; 
      maxDiff += 10;
    } else if (key === "projects") {
      const diff = Math.abs(userVal - idealVal);
      totalDiff += (diff / 20) * 10; 
      maxDiff += 10;
    } else if (key === "internships") {
      const diff = Math.abs(userVal - idealVal);
      totalDiff += (diff / 5) * 10; 
      maxDiff += 10;
    } else {
      const diff = Math.abs(userVal - idealVal);
      totalDiff += (diff / 9) * 10; 
      maxDiff += 10;
    }
  });

  const avgDiffPct = (totalDiff / maxDiff) * 100;
  return Math.max(60, Math.round(100 - avgDiffPct * 0.7)); // Floor at 60% for a positive UX
}

export default function App() {
  const initForm = () => {
    const f = {};
    fields.forEach((field) => {
      f[field.name] = parseFloat(((field.min + field.max) / 2).toFixed(1));
    });
    return f;
  };

  const [form, setForm] = useState(initForm);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("academics");
  const [scanStep, setScanStep] = useState(0);
  const [scanLogs, setScanLogs] = useState([]);
  
  const terminalEndRef = useRef(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scanLogs]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm(initForm());
    setResult("");
    setError("");
  };

  const predictCareer = async () => {
    setError("");
    setResult("");
    setLoading(true);
    setScanLogs([]);
    setScanStep(0);

    let apiFinished = false;
    let apiResult = null;
    let apiError = null;

    // Trigger API request
    fetch("http://localhost:8080/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server returned non-ok response");
        return res.json();
      })
      .then((data) => {
        apiResult = data.career;
        apiFinished = true;
      })
      .catch((err) => {
        console.error("API error:", err);
        apiError = "Unable to connect to prediction engine. Please check if your Spring Boot backend is active at port 8080.";
        apiFinished = true;
      });

    // Simulated terminal logs sequence
    const logs = [
      "Connecting to Spring Boot backend API gateway...",
      "Extracting 9-dimensional student skill vector...",
      "Loading Random Forest classifier (5000+ training records)...",
      "Computing prediction probability distribution...",
      "Evaluating skill gaps against career benchmarks...",
      "Compiling personalized career roadmap and matching telemetry..."
    ];

    let currentStep = 0;
    setScanLogs([`[CONNECT] ${logs[0]}`]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < logs.length) {
        setScanStep(currentStep);
        let prefix = "[INFO]";
        if (currentStep === 1) prefix = "[VECTOR]";
        if (currentStep === 2) prefix = "[MODEL]";
        if (currentStep === 3) prefix = "[COMPUTE]";
        if (currentStep === 4) prefix = "[GAP]";
        if (currentStep === 5) prefix = "[COMPILE]";
        setScanLogs((prev) => [...prev, `${prefix} ${logs[currentStep]}`]);
      } else {
        // Checking if API call has completed
        if (apiFinished) {
          clearInterval(interval);
          if (apiError) {
            setError(apiError);
            setLoading(false);
          } else {
            setResult(apiResult);
            setLoading(false);
          }
        } else {
          // If API takes longer, output waiting message
          setScanLogs((prev) => [...prev, `[WAIT] Awaiting machine learning model gateway response...`]);
          
          const checkApi = setInterval(() => {
            if (apiFinished) {
              clearInterval(checkApi);
              clearInterval(interval);
              if (apiError) {
                setError(apiError);
                setLoading(false);
              } else {
                setResult(apiResult);
                setLoading(false);
              }
            }
          }, 100);
        }
      }
    }, 250);
  };

  const currentStrength = getProfileStrength(form);
  const metadata = careerMetadata[result] || fallbackMetadata;
  const matchConfidence = result ? calculateMatchScore(form, metadata.ideal) : 0;

  // Calculate gaps for roadmap
  const getGaps = () => {
    if (!result) return [];
    return Object.keys(metadata.ideal)
      .map((key) => {
        const userVal = form[key];
        const idealVal = metadata.ideal[key];
        const gap = userVal - idealVal;
        const fieldInfo = fields.find((f) => f.name === key);
        return {
          key,
          label: fieldInfo ? fieldInfo.label : key,
          icon: fieldInfo ? fieldInfo.icon : "💡",
          userVal,
          idealVal,
          gap: parseFloat(gap.toFixed(1)),
        };
      });
  };

  const gaps = getGaps();
  // Filter gaps where user is below ideal, sorted by largest deficit first
  const gapsDeficit = gaps
    .filter((g) => g.gap < 0)
    .sort((a, b) => a.gap - b.gap);

  // Profile strength categories
  const getStrengthCategory = (score) => {
    if (score < 45) return { label: "Beginner Profile", color: "var(--color-danger)" };
    if (score < 70) return { label: "Intermediate Profile", color: "var(--color-warning)" };
    if (score < 85) return { label: "Advanced Profile", color: "var(--accent)" };
    return { label: "Industry-Ready Expert", color: "var(--color-success)" };
  };

  const strengthCategory = getStrengthCategory(currentStrength);

  // Dynamic comments for strength meter
  const getProfileInsights = () => {
    if (currentStrength < 45) {
      return "Your profile is in the early stages. Try increasing your CGPA, building structured portfolio projects, or learning foundational structures like DSA to expand your opportunities.";
    } else if (currentStrength < 70) {
      return "You have a solid foundation! Focus on building high-impact Projects and gaining Cloud, Mobile, or ML experience to qualify for advanced developer roles.";
    } else {
      return "Outstanding! Your profile is extremely competitive. You are well-positioned for specialized senior engineering or enterprise development tracks.";
    }
  };

  // Specific dynamic advice for roadmap items
  const getGapAdvice = (key, userVal, idealVal) => {
    const gapVal = Math.abs(userVal - idealVal).toFixed(1);
    switch (key) {
      case "dsa":
        return `Your Data Structures & Algorithms score of ${userVal} is below the recommended ${idealVal} (Deficit: -${gapVal}). Dedicate time to mastering hash tables, trees, graphs, and dynamic programming. Practice regularly on platforms like LeetCode.`;
      case "ml":
        return `Your ML/AI score of ${userVal} is below the recommended ${idealVal} (Deficit: -${gapVal}). Learn regression, decision trees, neural network fundamentals, and gain hands-on experience using scikit-learn or PyTorch.`;
      case "webdev":
        return `Your Web Development score of ${userVal} is below the recommended ${idealVal} (Deficit: -${gapVal}). Work on responsive frontend layouts and state management. Try building fully functional full-stack web applications with REST APIs.`;
      case "cloud":
        return `Your Cloud Knowledge of ${userVal} is below the recommended ${idealVal} (Deficit: -${gapVal}). Study core concepts of virtual servers, cloud storage, containerization (Docker), and serverless computing (AWS/GCP).`;
      case "cybersecurity":
        return `Your Cybersecurity level of ${userVal} is below the recommended ${idealVal} (Deficit: -${gapVal}). Focus on web application security protocols, auth mechanisms (JWT, OAuth), and basic network penetration testing.`;
      case "communication":
        return `Your Communication score of ${userVal} is below the recommended ${idealVal} (Deficit: -${gapVal}). Enhance your profile by practicing technical writing, code documentation, and participating in mock architectural interviews.`;
      case "cgpa":
        return `Your academic CGPA of ${userVal} is below the recommended benchmark of ${idealVal} (Deficit: -${gapVal}). Focus on strengthening core CS academic subjects like Operating Systems, DBMS, and Networking.`;
      case "projects":
        return `You have completed ${userVal} projects, whereas the target is ${idealVal} (Deficit: -${gapVal}). Build 2-3 end-to-end applications showcasing database usage, third-party APIs, and deployment configurations.`;
      case "internships":
        return `You have ${userVal} internships, while the target is ${idealVal} (Deficit: -${gapVal}). Gain practical experience by applying to junior internships, participating in hackathons, or contributing to Open Source repositories.`;
      default:
        return `Level up this category to meet the career target.`;
    }
  };

  const activeFields = fields.filter((f) => f.category === activeTab);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">🧭</div>
        <h1 className="app-title">Pathfinder AI</h1>
        <p className="app-subtitle">
          An intelligent multi-dimensional neural classifier designed to analyze academic performance, core coding skills, and domain experience to map your optimal career trajectory.
        </p>
      </header>

      {/* Main Grid */}
      <div className="dashboard-grid">
        
        {/* Left Panel - Skill Form */}
        <div className="glass-panel">
          <h2 className="panel-title">
            <span>🎚️</span> Student Skill Profiler
          </h2>

          {/* Form Tabs */}
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "academics" ? "active" : ""}`}
              onClick={() => setActiveTab("academics")}
            >
              🎓 Academics
            </button>
            <button
              className={`tab-btn ${activeTab === "tech" ? "active" : ""}`}
              onClick={() => setActiveTab("tech")}
            >
              💻 Tech Core
            </button>
            <button
              className={`tab-btn ${activeTab === "ops" ? "active" : ""}`}
              onClick={() => setActiveTab("ops")}
            >
              🌐 Operations
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message-box">
              <span>⚠️</span>
              <div>{error}</div>
            </div>
          )}

          {/* Sliders List */}
          <div className="sliders-grid" key={activeTab}>
            {activeFields.map((field) => {
              const val = form[field.name];
              return (
                <div className="slider-card" key={field.name}>
                  <div className="slider-card-header">
                    <span className="slider-label">
                      <span>{field.icon}</span> {field.label}
                    </span>
                    <span className="slider-badge">
                      {field.name === "cgpa" ? val.toFixed(1) : val}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="range-slider-input"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={val}
                    onChange={(e) => handleChange(field.name, parseFloat(e.target.value))}
                  />
                  <div className="slider-footer">
                    <span>MIN: {field.min}</span>
                    <span>MAX: {field.max}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Actions */}
          <div className="actions-row">
            <button
              className="btn-primary"
              onClick={predictCareer}
              disabled={loading}
            >
              {loading ? "⚡ Processing Vector..." : "✨ Predict Career Path"}
            </button>
            <button
              className="btn-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Right Panel - Dynamic Visualizer / Results */}
        <div className="glass-panel" style={{ minHeight: "480px" }}>
          
          {/* 1. Loading / Scanning State */}
          {loading && (
            <div className="scan-container">
              <div className="scan-line"></div>
              <div className="scan-header">
                <div className="scan-spinner"></div>
                <h3 style={{ fontSize: "16px", fontWeight: "700" }}>Neural Classifier Active</h3>
              </div>
              <div className="scan-terminal">
                {scanLogs.map((log, idx) => (
                  <div className="terminal-line" key={idx}>
                    <span className="terminal-stamp">[{new Date().toLocaleTimeString()}]</span>
                    <span className={`terminal-msg ${idx === scanStep ? "active" : ""}`}>
                      {log}
                    </span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          )}

          {/* 2. Idle State - Strength Gauge */}
          {!loading && !result && (
            <div className="idle-container">
              <div className="strength-gauge-wrap">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  {/* Background Track */}
                  <circle
                    cx="90"
                    cy="90"
                    r="80"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="10"
                  />
                  {/* Gauge Value Fill */}
                  <circle
                    className="strength-gauge-ring"
                    cx="90"
                    cy="90"
                    r="80"
                    fill="transparent"
                    stroke="var(--accent)"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 80}
                    strokeDashoffset={2 * Math.PI * 80 * (1 - currentStrength / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="strength-gauge-text">
                  <div className="strength-gauge-value">{currentStrength}%</div>
                  <div className="strength-gauge-lbl">Strength</div>
                </div>
              </div>

              <div
                className="strength-status-badge"
                style={{
                  color: strengthCategory.color,
                  backgroundColor: `rgba(${
                    strengthCategory.color === "var(--color-success)"
                      ? "16,185,129"
                      : strengthCategory.color === "var(--color-warning)"
                      ? "245,158,11"
                      : strengthCategory.color === "var(--color-danger)"
                      ? "239,68,68"
                      : "139,92,246"
                  }, 0.15)`,
                  borderColor: `rgba(${
                    strengthCategory.color === "var(--color-success)"
                      ? "16,185,129"
                      : strengthCategory.color === "var(--color-warning)"
                      ? "245,158,11"
                      : strengthCategory.color === "var(--color-danger)"
                      ? "239,68,68"
                      : "139,92,246"
                  }, 0.35)`,
                }}
              >
                {strengthCategory.label}
              </div>
              <p className="idle-desc">{getProfileInsights()}</p>
            </div>
          )}

          {/* 3. Prediction Result Dashboard State */}
          {!loading && result && (
            <div className="result-container">
              
              {/* Match Header */}
              <div className="result-header-card">
                <div className="result-career-info">
                  <div className="result-icon-box">{metadata.icon}</div>
                  <div>
                    <div className="result-subtitle">Match Recommendation</div>
                    <h3 className="result-title">{result}</h3>
                  </div>
                </div>
                {/* Confidence ring */}
                <div style={{ position: "relative", width: "68px", height: "68px" }}>
                  <svg width="68" height="68" viewBox="0 0 68 68">
                    <circle
                      cx="34"
                      cy="34"
                      r="30"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="5"
                    />
                    <circle
                      className="strength-gauge-ring"
                      cx="34"
                      cy="34"
                      r="30"
                      fill="transparent"
                      stroke="var(--accent-secondary)"
                      strokeWidth="5"
                      strokeDasharray={2 * Math.PI * 30}
                      strokeDashoffset={2 * Math.PI * 30 * (1 - matchConfidence / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "12px",
                      fontWeight: "800",
                      fontFamily: "var(--mono)",
                      color: "#ffffff"
                    }}
                  >
                    {matchConfidence}%
                  </div>
                </div>
              </div>

              {/* Career Description */}
              <p className="career-desc">{metadata.description}</p>

              {/* Career Quick Stats */}
              <div className="result-stats-row">
                <div className="stat-item">
                  <span className="stat-item-lbl">Avg Starting Salary</span>
                  <span className="stat-item-val" style={{ color: "var(--color-success)" }}>
                    {metadata.salary}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-item-lbl">Market Outlook</span>
                  <span className="stat-item-val" style={{ color: "var(--color-info)" }}>
                    {metadata.outlook}
                  </span>
                </div>
              </div>

              {/* Skill Gap Analysis Bar Chart */}
              <div>
                <h4 className="gap-chart-title">Skill Gap Analysis vs. Career Benchmark</h4>
                <div className="gap-bars-list">
                  {gaps.map((g) => {
                    // Normalize values for progress bar widths
                    let userPct = 0;
                    let idealPct = 0;
                    if (g.key === "cgpa") {
                      userPct = ((g.userVal - 5) / 5) * 100;
                      idealPct = ((g.idealVal - 5) / 5) * 100;
                    } else if (g.key === "projects") {
                      userPct = (g.userVal / 20) * 100;
                      idealPct = (g.idealVal / 20) * 100;
                    } else if (g.key === "internships") {
                      userPct = (g.userVal / 5) * 100;
                      idealPct = (g.idealVal / 5) * 100;
                    } else {
                      userPct = ((g.userVal - 1) / 9) * 100;
                      idealPct = ((g.idealVal - 1) / 9) * 100;
                    }

                    userPct = Math.min(100, Math.max(0, userPct));
                    idealPct = Math.min(100, Math.max(0, idealPct));

                    return (
                      <div className="gap-bar-item" key={g.key}>
                        <div className="gap-bar-labels">
                          <span className="gap-bar-name">
                            <span>{g.icon}</span> {g.label}
                          </span>
                          <span className="gap-bar-nums">
                            {g.key === "cgpa" ? g.userVal.toFixed(1) : g.userVal}
                            <span style={{ color: "var(--text-muted)", margin: "0 4px" }}>/</span>
                            <span style={{ color: "var(--text-secondary)" }}>
                              {g.key === "cgpa" ? g.idealVal.toFixed(1) : g.idealVal}
                            </span>
                            {g.gap >= 0 ? (
                              <span className="gap-diff surplus">+{g.gap}</span>
                            ) : (
                              <span className="gap-diff deficit">{g.gap}</span>
                            )}
                          </span>
                        </div>
                        <div className="bar-track">
                          {/* User Skill Level Bar */}
                          <div className="bar-fill-user" style={{ width: `${userPct}%` }}></div>
                          {/* Ideal Benchmark Position Pin */}
                          <div
                            className="bar-fill-ideal-marker"
                            style={{ left: `${idealPct}%` }}
                          >
                            <span className="bar-ideal-tooltip">Target: {g.idealVal}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Roadmap Timeline */}
              <div className="roadmap-box">
                <h4 className="roadmap-title">
                  <span>🚀</span> Skill Enhancement Roadmap
                </h4>
                
                {gapsDeficit.length > 0 ? (
                  <div className="roadmap-timeline">
                    {gapsDeficit.slice(0, 3).map((g, index) => (
                      <div className="roadmap-step" key={g.key}>
                        <div className="roadmap-dot"></div>
                        <div className="roadmap-step-header">
                          <span>STEP {index + 1}: Level up {g.label}</span>
                          <span style={{ color: "var(--color-danger)" }}>Gap: {g.gap}</span>
                        </div>
                        <p className="roadmap-step-desc">
                          {getGapAdvice(g.key, g.userVal, g.idealVal)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 0",
                      textAlign: "center"
                    }}
                  >
                    <span style={{ fontSize: "24px", marginBottom: "8px" }}>🏆</span>
                    <p style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-success)" }}>
                      Profile Fully Aligned!
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
                      Your skills meet or exceed all ideal targets for a {result}. Focus on mock behavioral interviews and systems architecture practice.
                    </p>
                  </div>
                )}

                {/* Core topics */}
                <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.5px" }}>
                    Recommended Focus Topics
                  </div>
                  <div className="roadmap-topics">
                    {metadata.topics.map((t) => (
                      <span className="roadmap-topic-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}