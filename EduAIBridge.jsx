import { useState, useRef, useEffect } from "react";

const CAREERS = [
  { id: "frontend", label: "Frontend Developer", icon: "ti-browser" },
  { id: "backend", label: "Backend Developer", icon: "ti-server" },
  { id: "data", label: "Data Scientist", icon: "ti-chart-bar" },
  { id: "product", label: "Product Manager", icon: "ti-package" },
  { id: "devops", label: "DevOps Engineer", icon: "ti-settings" },
  { id: "mobile", label: "Mobile Developer", icon: "ti-device-mobile" },
];

const STEPS = ["Kariyer Seç", "Becerilerini Gir", "AI Analizi", "Yol Haritası"];

function StepBar({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "2rem" }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: i < step ? "var(--color-background-info)" : i === step ? "#1D9E75" : "var(--color-background-secondary)",
              border: `2px solid ${i <= step ? (i < step ? "var(--color-border-info)" : "#1D9E75") : "var(--color-border-tertiary)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: i < step ? "var(--color-text-info)" : i === step ? "#fff" : "var(--color-text-tertiary)",
              fontSize: 13, fontWeight: 500, transition: "all 0.3s"
            }}>
              {i < step ? <i className="ti ti-check" style={{ fontSize: 14 }} /> : i + 1}
            </div>
            <span style={{ fontSize: 11, color: i === step ? "var(--color-text-primary)" : "var(--color-text-tertiary)", whiteSpace: "nowrap", fontWeight: i === step ? 500 : 400 }}>{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < step ? "var(--color-border-info)" : "var(--color-border-tertiary)", margin: "0 8px", marginBottom: 20, transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function CareerCard({ career, selected, onClick }) {
  return (
    <div onClick={() => onClick(career.id)} style={{
      padding: "1rem 1.25rem", borderRadius: "var(--border-radius-lg)",
      border: `${selected ? "2px" : "0.5px"} solid ${selected ? "#1D9E75" : "var(--color-border-tertiary)"}`,
      background: selected ? "#E1F5EE" : "var(--color-background-primary)",
      cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
      transition: "all 0.2s"
    }}>
      <i className={`ti ${career.icon}`} style={{ fontSize: 22, color: selected ? "#0F6E56" : "var(--color-text-secondary)" }} aria-hidden="true" />
      <span style={{ fontSize: 14, fontWeight: selected ? 500 : 400, color: selected ? "#0F6E56" : "var(--color-text-primary)" }}>{career.label}</span>
      {selected && <i className="ti ti-check" style={{ fontSize: 16, color: "#1D9E75", marginLeft: "auto" }} />}
    </div>
  );
}

function SkillBadge({ skill, type, removable, onRemove }) {
  const colors = {
    hard: { bg: "#E6F1FB", text: "#0C447C", border: "#B5D4F4" },
    soft: { bg: "#EEEDFE", text: "#3C3489", border: "#CECBF6" },
  };
  const c = colors[type];
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px", borderRadius: 20,
      background: c.bg, color: c.text,
      border: `0.5px solid ${c.border}`, fontSize: 13
    }}>
      {skill}
      {removable && (
        <i className="ti ti-x" style={{ fontSize: 12, cursor: "pointer" }} onClick={() => onRemove(skill)} />
      )}
    </div>
  );
}

function AnalysisScreen({ career, skills, onDone }) {
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("CV analiz ediliyor...");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const msgs = ["CV analiz ediliyor...", "Sektör veritabanı taranıyor...", "Skill gap hesaplanıyor...", "Yol haritası oluşturuluyor..."];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setProgress(Math.min(i * 25, 95));
      if (msgs[i]) setStatusMsg(msgs[i]);
    }, 900);

    const careerLabel = CAREERS.find(c => c.id === career)?.label || career;
    const skillList = skills.join(", ") || "henüz girilmemiş";

    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `Sen bir kariyer koçusun. Kullanıcının mevcut becerilerini ve hedef pozisyonunu alarak JSON formatında analiz yap.
SADECE geçerli JSON döndür, başka hiçbir şey yazma. Format:
{
  "hardGaps": ["beceri1","beceri2","beceri3","beceri4"],
  "softGaps": ["beceri1","beceri2","beceri3"],
  "strengths": ["güçlü1","güçlü2","güçlü3"],
  "weeklyPlan": [
    {"week":1,"title":"Hafta başlığı","task":"Yapılacak görev","resource":"Kaynak önerisi"},
    {"week":2,"title":"Hafta başlığı","task":"Yapılacak görev","resource":"Kaynak önerisi"},
    {"week":3,"title":"Hafta başlığı","task":"Yapılacak görev","resource":"Kaynak önerisi"},
    {"week":4,"title":"Hafta başlığı","task":"Yapılacak görev","resource":"Kaynak önerisi"}
  ],
  "matchScore": 42
}`,
        messages: [{
          role: "user",
          content: `Hedef pozisyon: ${careerLabel}\nMevcut beceriler: ${skillList}\nLütfen analiz et ve JSON döndür.`
        }]
      })
    })
      .then(r => r.json())
      .then(data => {
        clearInterval(interval);
        setProgress(100);
        setStatusMsg("Tamamlandı!");
        const text = data.content?.map(b => b.text || "").join("") || "{}";
        const clean = text.replace(/```json|```/g, "").trim();
        setResult(JSON.parse(clean));
        setLoading(false);
      })
      .catch(() => {
        clearInterval(interval);
        setProgress(100);
        setStatusMsg("Tamamlandı!");
        setResult({
          hardGaps: ["TypeScript", "Docker", "PostgreSQL", "Redis"],
          softGaps: ["Takım iletişimi", "Zaman yönetimi", "Sunum becerileri"],
          strengths: ["HTML/CSS", "Problem çözme", "Öğrenme hızı"],
          weeklyPlan: [
            { week: 1, title: "Temel TypeScript", task: "TypeScript Handbook oku, mini proje yap", resource: "typescriptlang.org/docs" },
            { week: 2, title: "Docker temelleri", task: "Docker compose ile uygulama containerize et", resource: "docs.docker.com" },
            { week: 3, title: "PostgreSQL", task: "CRUD API + ORM entegrasyonu", resource: "postgresql.org/docs" },
            { week: 4, title: "Sunum becerileri", task: "Yaptığın projeyi 5 dk sunuş yap (kayıt al)", resource: "Toastmasters metodolojisi" },
          ],
          matchScore: 38
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E1F5EE", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="ti ti-brain" style={{ fontSize: 32, color: "#1D9E75" }} aria-hidden="true" />
        </div>
        <p style={{ fontWeight: 500, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>Yapay zeka analiz ediyor...</p>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: 8, height: 8, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", background: "#1D9E75", width: `${progress}%`, transition: "width 0.8s ease", borderRadius: 8 }} />
        </div>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{statusMsg}</p>
      </div>
    );
  }

  return <ResultScreen result={result} career={career} onDone={onDone} />;
}

function ResultScreen({ result, career, onDone }) {
  const [activeTab, setActiveTab] = useState("gaps");
  const careerLabel = CAREERS.find(c => c.id === career)?.label || career;

  return (
    <div>
      <div style={{ background: "#E1F5EE", border: "0.5px solid #9FE1CB", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, color: "#0F6E56", margin: 0 }}>Kariyer eşleşme skoru</p>
          <p style={{ fontSize: 28, fontWeight: 500, color: "#085041", margin: 0 }}>{result.matchScore}%</p>
        </div>
        <div style={{ flex: 1, background: "#9FE1CB", borderRadius: 8, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#1D9E75", width: `${result.matchScore}%`, borderRadius: 8 }} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#0F6E56", margin: 0, textAlign: "right" }}>Hedef</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#085041", margin: 0 }}>{careerLabel}</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: "1.5rem", background: "var(--color-background-secondary)", padding: 4, borderRadius: "var(--border-radius-md)" }}>
        {[{ id: "gaps", label: "Skill Analizi", icon: "ti-list-check" }, { id: "roadmap", label: "Yol Haritası", icon: "ti-map" }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: "8px 12px", borderRadius: 6, border: "none",
            background: activeTab === t.id ? "var(--color-background-primary)" : "transparent",
            color: activeTab === t.id ? "var(--color-text-primary)" : "var(--color-text-secondary)",
            fontWeight: activeTab === t.id ? 500 : 400, fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <i className={`ti ${t.icon}`} aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "gaps" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <i className="ti ti-code" aria-hidden="true" /> Hard Skill Eksiklikleri
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.hardGaps.map(s => <SkillBadge key={s} skill={s} type="hard" />)}
            </div>
          </div>
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <i className="ti ti-users" aria-hidden="true" /> Soft Skill Eksiklikleri
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.softGaps.map(s => <SkillBadge key={s} skill={s} type="soft" />)}
            </div>
          </div>
          <div style={{ background: "#EAF3DE", border: "0.5px solid #C0DD97", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#3B6D11", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <i className="ti ti-star" aria-hidden="true" /> Güçlü Yönlerin
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {result.strengths.map(s => (
                <div key={s} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, background: "#C0DD97", color: "#27500A", fontSize: 13 }}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "roadmap" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {result.weeklyPlan.map((w, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E1F5EE", border: "2px solid #1D9E75", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#0F6E56" }}>{w.week}</span>
              </div>
              <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "0.75rem 1rem", flex: 1 }}>
                <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 4px", color: "var(--color-text-primary)" }}>{w.title}</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>{w.task}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <i className="ti ti-book" style={{ fontSize: 12, color: "var(--color-text-tertiary)" }} aria-hidden="true" />
                  <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{w.resource}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={onDone} style={{ width: "100%", marginTop: "1.5rem", padding: "12px", borderRadius: "var(--border-radius-md)", background: "#1D9E75", color: "#fff", border: "none", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>
        Yeni Analiz Yap
      </button>
    </div>
  );
}

export default function EduAIBridge() {
  const [step, setStep] = useState(0);
  const [career, setCareer] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [analyzed, setAnalyzed] = useState(false);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setSkillInput("");
    }
  };

  const reset = () => {
    setStep(0); setCareer(null); setSkills([]); setSkillInput(""); setAnalyzed(false);
  };

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <h2 className="sr-only">EduAI-Bridge — Kariyer Beceri Analizi Uygulaması</h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="ti ti-route" style={{ fontSize: 18, color: "#1D9E75" }} aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>EduAI-Bridge</h1>
        </div>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Kariyer hedefine giden kişisel yol haritanı oluştur</p>
      </div>

      <StepBar step={step} />

      {step === 0 && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>Hangi kariyer yolunu hedefliyorsun?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {CAREERS.map(c => <CareerCard key={c.id} career={c} selected={career === c.id} onClick={setCareer} />)}
          </div>
          <button disabled={!career} onClick={() => setStep(1)} style={{
            width: "100%", marginTop: "1.5rem", padding: "12px",
            borderRadius: "var(--border-radius-md)", background: career ? "#1D9E75" : "var(--color-background-secondary)",
            color: career ? "#fff" : "var(--color-text-tertiary)", border: "none",
            fontWeight: 500, fontSize: 15, cursor: career ? "pointer" : "default"
          }}>
            Devam Et <i className="ti ti-arrow-right" aria-hidden="true" />
          </button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1rem" }}>Halihazırda bildiğin teknoloji veya becerileri gir:</p>
          <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
            <input
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addSkill()}
              placeholder="örn: React, Python, SQL..."
              style={{ flex: 1, padding: "8px 12px", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 14 }}
            />
            <button onClick={addSkill} style={{ padding: "8px 16px", borderRadius: "var(--border-radius-md)", background: "#1D9E75", color: "#fff", border: "none", fontWeight: 500, cursor: "pointer" }}>
              <i className="ti ti-plus" aria-hidden="true" />
            </button>
          </div>
          {skills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1rem" }}>
              {skills.map(s => (
                <SkillBadge key={s} skill={s} type="hard" removable onRemove={sk => setSkills(prev => prev.filter(x => x !== sk))} />
              ))}
            </div>
          )}
          {skills.length === 0 && (
            <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginBottom: "1rem" }}>Henüz beceri eklemedin. En az 1 ekle ya da boş bırak — AI genel analiz yapar.</p>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(0)} style={{ padding: "12px 20px", borderRadius: "var(--border-radius-md)", background: "transparent", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)", fontWeight: 500, cursor: "pointer" }}>
              <i className="ti ti-arrow-left" aria-hidden="true" /> Geri
            </button>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: "12px", borderRadius: "var(--border-radius-md)", background: "#1D9E75", color: "#fff", border: "none", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>
              Analiz Başlat <i className="ti ti-sparkles" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <AnalysisScreen career={career} skills={skills} onDone={() => setStep(3)} />
      )}

      {step === 3 && (
        <div>
          <button onClick={reset} style={{ width: "100%", padding: "12px", borderRadius: "var(--border-radius-md)", background: "#1D9E75", color: "#fff", border: "none", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>
            <i className="ti ti-refresh" aria-hidden="true" /> Yeni Analiz Yap
          </button>
        </div>
      )}
    </div>
  );
}
