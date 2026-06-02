import { useState, useEffect } from "react";

const fields = [
  { name: "cgpa", label: "CGPA", min: 5, max: 10, icon: "🎓", step: 0.1 },
  { name: "dsa", label: "DSA Skill", min: 1, max: 10, icon: "🌳", step: 1 },
  { name: "communication", label: "Communication", min: 1, max: 10, icon: "💬", step: 1 },
  { name: "ml", label: "ML / AI", min: 1, max: 10, icon: "🧠", step: 1 },
  { name: "webdev", label: "Web Development", min: 1, max: 10, icon: "🌐", step: 1 },
  { name: "cloud", label: "Cloud Knowledge", min: 1, max: 10, icon: "☁️", step: 1 },
  { name: "cybersecurity", label: "Cybersecurity", min: 1, max: 10, icon: "🔐", step: 1 },
  { name: "projects", label: "Projects Completed", min: 0, max: 20, icon: "📁", step: 1 },
  { name: "internships", label: "Internships", min: 0, max: 5, icon: "🏢", step: 1 },
];

const careerIcons = {
  "Software Engineer": "💻",
  "Data Scientist": "📊",
  "ML Engineer": "🤖",
  "Full Stack Developer": "🖥️",
  "Cloud Architect": "☁️",
  "Cybersecurity Analyst": "🛡️",
  "DevOps Engineer": "⚙️",
  "AI Researcher": "🔬",
  "Product Manager": "📋",
  "Backend Developer": "🗄️",
};

function getBarColor(pct) {
  if (pct < 0.35) return "#E24B4A";
  if (pct < 0.65) return "#EF9F27";
  return "#1D9E75";
}

function SkillSlider({ field, value, onChange }) {
  const pct = (value - field.min) / (field.max - field.min);
  const fill = Math.round(pct * 100);
  const color = getBarColor(pct);

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardLabel}>
          <span style={{ marginRight: 6 }}>{field.icon}</span>
          {field.label}
        </span>
        <span style={styles.badge}>{parseFloat(value.toFixed(1))}</span>
      </div>
      <div style={styles.barBg}>
        <div style={{ ...styles.barFill, width: `${fill}%`, background: color }} />
      </div>
      <input
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => onChange(field.name, parseFloat(e.target.value))}
        style={styles.slider}
      />
      <div style={styles.rangeLabels}>
        <span>{field.min}</span>
        <span>{field.max}</span>
      </div>
    </div>
  );
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
  const [topSkill, setTopSkill] = useState("");

  useEffect(() => {
    const skillFields = ["dsa", "communication", "ml", "webdev", "cloud", "cybersecurity"];
    const skillLabels = {
      dsa: "DSA",
      communication: "Communication",
      ml: "ML/AI",
      webdev: "Web Dev",
      cloud: "Cloud",
      cybersecurity: "Cybersecurity",
    };
    let top = "DSA", topVal = 0;
    skillFields.forEach((k) => {
      if (form[k] > topVal) {
        topVal = form[k];
        top = skillLabels[k];
      }
    });
    setTopSkill(top);
  }, [form]);

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

  try {
    const response = await fetch(
      "http://localhost:8080/api/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    console.log("Prediction:", data);

    setResult(data.career);

  } catch (err) {
    console.error(err);
    setError("Could not connect to the prediction service. Please try again.");
  }

  setLoading(false);
};

  const progress = Math.round((fields.filter((f) => form[f.name] !== undefined).length / fields.length) * 100);

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🧭 Career Prediction</h1>
        <p style={styles.subtitle}>Adjust the sliders to reflect your skills and academic profile</p>
      </div>

      {/* Progress */}
      <div style={styles.progressSection}>
        <div style={styles.progressLabel}>{fields.length} of {fields.length} fields configured</div>
        <div style={styles.progressBg}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
      </div>

      {/* Skill Grid */}
      <div style={styles.grid}>
        {fields.map((field) => (
          <SkillSlider
            key={field.name}
            field={field}
            value={form[field.name]}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Error */}
      {error && <div style={styles.errorBox}>{error}</div>}

      {/* Actions */}
      <div style={styles.actions}>
        <button onClick={predictCareer} disabled={loading} style={styles.primaryBtn}>
          {loading ? "Analyzing…" : "✨ Predict Career"}
        </button>
        <button onClick={handleReset} style={styles.secondaryBtn}>↺ Reset</button>
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.loadingWrap}>
          <div style={styles.spinner} />
          <span style={{ color: "#888", fontSize: 14 }}>Analyzing your profile…</span>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={styles.resultCard}>
          <div style={styles.resultHeader}>
            <div style={styles.resultIconWrap}>
              <span style={{ fontSize: 22 }}>{careerIcons[result] || "💼"}</span>
            </div>
            <div>
              <p style={styles.resultLabel}>recommended career path</p>
              <p style={styles.resultRole}>{result}</p>
            </div>
          </div>
          <hr style={styles.divider} />
          <div style={styles.scoreGrid}>
            <div style={styles.scoreCard}>
              <div style={styles.scoreNum}>{parseFloat(form.cgpa.toFixed(1))}</div>
              <div style={styles.scoreLbl}>CGPA</div>
            </div>
            <div style={styles.scoreCard}>
              <div style={styles.scoreNum}>{topSkill}</div>
              <div style={styles.scoreLbl}>top skill</div>
            </div>
            <div style={styles.scoreCard}>
              <div style={styles.scoreNum}>{form.projects}</div>
              <div style={styles.scoreLbl}>projects</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "30px auto",
    padding: "0 20px 40px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "#1a1a1a",
  },
  header: { marginBottom: 24 },
  title: { fontSize: 26, fontWeight: 600, margin: "0 0 4px" },
  subtitle: { fontSize: 14, color: "#666", margin: 0 },

  progressSection: { marginBottom: 24 },
  progressLabel: { fontSize: 12, color: "#999", marginBottom: 6 },
  progressBg: { height: 3, background: "#eee", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", background: "#1a1a1a", borderRadius: 2, transition: "width 0.3s" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 12,
    marginBottom: 24,
  },
  card: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 12,
    padding: "14px 16px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardLabel: { fontSize: 13, fontWeight: 500, color: "#555" },
  badge: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a1a1a",
    background: "#f4f4f4",
    padding: "2px 10px",
    borderRadius: 8,
    border: "1px solid #e8e8e8",
    minWidth: 40,
    textAlign: "center",
  },
  barBg: { height: 6, background: "#f0f0f0", borderRadius: 3, overflow: "hidden", marginBottom: 6 },
  barFill: { height: "100%", borderRadius: 3, transition: "width 0.2s, background 0.2s" },
  slider: { width: "100%", cursor: "pointer", margin: "4px 0" },
  rangeLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#bbb",
  },

  errorBox: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 14,
    color: "#c0392b",
    marginBottom: 16,
  },

  actions: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 20 },
  primaryBtn: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "11px 24px",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "transparent",
    color: "#555",
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: "11px 18px",
    fontSize: 14,
    cursor: "pointer",
  },

  loadingWrap: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid #e0e0e0",
    borderTopColor: "#1a1a1a",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  resultCard: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 12,
    padding: 24,
    marginTop: 8,
  },
  resultHeader: { display: "flex", alignItems: "center", gap: 14, marginBottom: 16 },
  resultIconWrap: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    background: "#EEF4FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  resultLabel: { fontSize: 12, color: "#999", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" },
  resultRole: { fontSize: 22, fontWeight: 600, margin: 0, color: "#1a1a1a" },
  divider: { border: "none", borderTop: "1px solid #f0f0f0", margin: "0 0 16px" },

  scoreGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 },
  scoreCard: {
    background: "#f8f8f8",
    borderRadius: 8,
    padding: "10px",
    textAlign: "center",
  },
  scoreNum: { fontSize: 18, fontWeight: 600, color: "#1a1a1a" },
  scoreLbl: { fontSize: 11, color: "#999", marginTop: 2 },
};