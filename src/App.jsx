import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "skills", label: "Skills" },
  { href: "education", label: "Education" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

const TECH_SKILLS = [
  { label: "HTML", icon: "🌐", level: 85 },
  { label: "CSS", icon: "🎨", level: 80 },
  { label: "JavaScript", icon: "⚡", level: 65 },
  { label: "Responsive Design", icon: "📱", level: 75 },
  { label: "Web Dev Basics", icon: "💻", level: 80 },
];

const SOFT_SKILLS = [
  "Critical Thinking",
  "Step-by-step Learning",
  "Task Management",
  "Teamwork",
  "Eager to Learn",
];

const EDUCATION = [
  {
    degree: "BS Information Technology",
    school: "STI College San Jose Del Monte",
    year: "2023 – Present",
    icon: "🎓",
  },
  {
    degree: "Senior High School",
    school: "Colegio de San Gabriel Arcangel",
    year: "2021 – 2023",
    icon: "📘",
  },
  {
    degree: "Junior High School",
    school: "San Jose Del Monte National Trade School",
    year: "2017 – 2021",
    icon: "📗",
  },
  {
    degree: "Elementary",
    school: "Bagong Buhay F Elementary School",
    year: "2011 – 2017",
    icon: "📕",
  },
];

const PROJECTS = [
  {
    title: "My Portfolio Website",
    desc: "A personal portfolio website built using HTML, CSS, and JavaScript. Showcases skills, education, and contact details with smooth scroll animations and a responsive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#ff69b4",
  },
  {
    title: "Simple Web Page",
    desc: "A basic web page created as part of my web development course. Includes text, images, and links — my first hands-on project in coding.",
    tags: ["HTML", "CSS"],
    color: "#d63384",
  },
];

// --- Scroll utility ---
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// --- Fade-in hook ---
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// --- Section wrapper ---
function Section({ id, children, className = "" }) {
  const [ref, visible] = useFadeIn();
  return (
    <section
      id={id}
      ref={ref}
      className={`section ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

// --- Skill Bar ---
function SkillBar({ label, icon, level }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className="skill-bar-wrap">
      <div className="skill-bar-label">
        <span>{icon} {label}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

// --- Navbar ---
function Navbar({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-brand" onClick={() => scrollTo("home")}>
        <span className="brand-dot" />
        Xyra
      </div>
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? "bar open" : "bar"} />
        <span className={menuOpen ? "bar open" : "bar"} />
        <span className={menuOpen ? "bar open" : "bar"} />
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <button
              className={`nav-btn ${active === href ? "active" : ""}`}
              onClick={() => { scrollTo(href); setMenuOpen(false); }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// --- Hero ---
function Hero() {
  const [typed, setTyped] = useState("");
  const fullText = "BS Information Technology Student";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-blob blob1" />
      <div className="hero-bg-blob blob2" />
      <div className="hero-content">
        <div className="hero-img-wrap">
          <img src="xyra.jpg" alt="Xyra Shane G. Fider" className="hero-img" />
          <div className="hero-img-ring" />
        </div>
        <div className="hero-text">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Xyra Shane G. Fider</h1>
          <p className="hero-typed">
            {typed}
            <span className="cursor">|</span>
          </p>
          <p className="hero-tagline">
            Passionate about web development & lifelong learning 🌸
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>
              Contact Me
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("projects")}>
              View Projects
            </button>
          </div>
        </div>
      </div>
      <div className="scroll-hint" onClick={() => scrollTo("about")}>
        ↓
      </div>
    </section>
  );
}

// --- About ---
function About() {
  return (
    <Section id="about" className="about-section">
      <div className="section-tag">Who I Am</div>
      <h2 className="section-title">About Me</h2>
      <div className="about-grid">
        <div className="about-card">
          <div className="about-icon">📚</div>
          <h3>Student</h3>
          <p>Currently studying BS in Information Technology, learning the fundamentals of how computers and websites function.</p>
        </div>
        <div className="about-card">
          <div className="about-icon">💡</div>
          <h3>Explorer</h3>
          <p>I enjoy discovering new things about technology, especially in simple web development and creative design.</p>
        </div>
        <div className="about-card">
          <div className="about-icon">🚀</div>
          <h3>Learner</h3>
          <p>Eager to grow my skills, take on challenges, and keep improving — one project at a time.</p>
        </div>
      </div>
    </Section>
  );
}

// --- Skills ---
function Skills() {
  return (
    <Section id="skills" className="skills-section">
      <div className="section-tag">What I Know</div>
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        <div className="skills-col">
          <h3 className="skills-sub">Technical Skills</h3>
          {TECH_SKILLS.map((s) => (
            <SkillBar key={s.label} {...s} />
          ))}
        </div>
        <div className="skills-col">
          <h3 className="skills-sub">Personal Skills</h3>
          <div className="soft-skills">
            {SOFT_SKILLS.map((s) => (
              <span key={s} className="soft-pill">{s}</span>
            ))}
          </div>
          <div className="quote-card">
            <p>"The best way to learn is by doing."</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// --- Education ---
function Education() {
  return (
    <Section id="education" className="edu-section">
      <div className="section-tag">My Journey</div>
      <h2 className="section-title">Education</h2>
      <div className="timeline">
        {EDUCATION.map((e, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot">{e.icon}</div>
            <div className="timeline-card">
              <div className="timeline-year">{e.year}</div>
              <h3 className="timeline-degree">{e.degree}</h3>
              <p className="timeline-school">{e.school}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Projects ---
function Projects() {
  return (
    <Section id="projects" className="projects-section">
      <div className="section-tag">My Work</div>
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <div key={i} className="project-card" style={{ "--accent": p.color }}>
            <div className="project-accent" />
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map((t) => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Contact ---
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <Section id="contact" className="contact-section">
      <div className="section-tag">Get In Touch</div>
      <h2 className="section-title">Contact Me</h2>
      <div className="contact-grid">
        <div className="contact-info">
          <p className="contact-intro">
            Feel free to reach out — I'm always happy to connect! 🌸
          </p>
          <div className="contact-detail">
            <span className="contact-icon">📧</span>
            <a href="mailto:fiderxyrashane@gmail.com">fiderxyrashane@gmail.com</a>
          </div>
          <div className="contact-detail">
            <span className="contact-icon">📍</span>
            <span>San Jose Del Monte, Bulacan, PH</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handle}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handle}
            required
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={form.message}
            onChange={handle}
            required
          />
          <button type="submit" className="btn-primary">
            Send Message ✉️
          </button>
          {sent && (
            <p className="success-msg">✅ Message sent! Thank you for reaching out.</p>
          )}
        </form>
      </div>
    </Section>
  );
}

// --- Scroll To Top ---
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return show ? (
    <button className="scroll-top" onClick={() => scrollTo("home")}>↑</button>
  ) : null;
}

// --- Active section tracker ---
function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href);
    const onScroll = () => {
      const y = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= y) { setActive(ids[i]); return; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

// --- App ---
export default function App() {
  const active = useActiveSection();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --pink: #ff69b4;
          --pink-dark: #d63384;
          --pink-light: #ffb6c1;
          --pink-pale: #fff0f7;
          --white: #ffffff;
          --text: #1a1a2e;
          --text-muted: #6b6b8a;
          --bg: #fdf6fb;
          --card-bg: #ffffff;
          --shadow: 0 8px 32px rgba(214,51,132,0.10);
          --radius: 18px;
          --transition: 0.4s cubic-bezier(.4,0,.2,1);
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }

        /* ---- NAVBAR ---- */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 36px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          transition: box-shadow var(--transition);
        }
        .navbar.scrolled { box-shadow: 0 4px 24px rgba(214,51,132,0.12); }

        .nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--pink-dark);
          cursor: pointer;
          display: flex; align-items: center; gap: 8px;
        }
        .brand-dot {
          width: 10px; height: 10px;
          background: var(--pink);
          border-radius: 50%;
          display: inline-block;
        }

        .nav-links {
          display: flex; list-style: none; gap: 4px;
          align-items: center;
        }
        .nav-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500;
          color: var(--text-muted);
          padding: 7px 14px; border-radius: 30px;
          transition: background var(--transition), color var(--transition);
        }
        .nav-btn:hover, .nav-btn.active {
          background: var(--pink-pale);
          color: var(--pink-dark);
        }
        .nav-btn.active { background: var(--pink); color: white; }

        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .bar {
          width: 24px; height: 2px;
          background: var(--pink-dark);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        @media (max-width: 700px) {
          .navbar { padding: 14px 20px; }
          .hamburger { display: flex; }
          .nav-links {
            display: none; flex-direction: column;
            position: absolute; top: 100%; left: 0; right: 0;
            background: white; padding: 16px;
            box-shadow: var(--shadow);
          }
          .nav-links.open { display: flex; }
        }

        /* ---- HERO ---- */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 100px 24px 60px;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #fff0f7 0%, #fce4f3 50%, #f3d4ef 100%);
        }
        .hero-bg-blob {
          position: absolute; border-radius: 50%;
          filter: blur(60px); opacity: 0.35; pointer-events: none;
        }
        .blob1 { width: 500px; height: 500px; background: #ffb6c1; top: -100px; right: -100px; }
        .blob2 { width: 350px; height: 350px; background: #f9a8d4; bottom: -80px; left: -80px; }

        .hero-content {
          display: flex; flex-direction: column; align-items: center;
          gap: 28px; max-width: 700px; text-align: center; position: relative; z-index: 1;
        }

        .hero-img-wrap {
          position: relative; width: 160px; height: 160px;
        }
        .hero-img {
          width: 160px; height: 160px; border-radius: 50%;
          object-fit: cover;
          border: 5px solid white;
          box-shadow: 0 8px 40px rgba(214,51,132,0.25);
          transition: transform 0.4s;
        }
        .hero-img:hover { transform: scale(1.05); }
        .hero-img-ring {
          position: absolute; inset: -8px;
          border-radius: 50%;
          border: 3px dashed var(--pink-light);
          animation: spin 12s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .hero-greeting { font-size: 1rem; color: var(--pink); font-weight: 500; letter-spacing: 2px; text-transform: uppercase; }

        .hero-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 3.2rem);
          color: var(--text); line-height: 1.15;
        }

        .hero-typed {
          font-size: 1.05rem; color: var(--pink-dark); font-weight: 500; min-height: 28px;
        }
        .cursor {
          display: inline-block; animation: blink 0.9s step-end infinite;
          color: var(--pink);
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .hero-tagline { font-size: 0.95rem; color: var(--text-muted); }

        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }

        .btn-primary {
          background: linear-gradient(135deg, var(--pink), var(--pink-dark));
          color: white; border: none; border-radius: 30px;
          padding: 12px 28px; font-size: 0.95rem; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 20px rgba(214,51,132,0.3);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(214,51,132,0.4); }

        .btn-ghost {
          background: white; color: var(--pink-dark); border: 2px solid var(--pink-light);
          border-radius: 30px; padding: 10px 24px; font-size: 0.95rem; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: var(--pink); background: var(--pink-pale); }

        .scroll-hint {
          margin-top: 40px; font-size: 1.5rem; color: var(--pink);
          animation: bounce 2s infinite; cursor: pointer; position: relative; z-index: 1;
        }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

        /* ---- SECTIONS ---- */
        .section {
          max-width: 860px; margin: 0 auto;
          padding: 80px 24px;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .section.visible { opacity: 1; transform: translateY(0); }

        .section-tag {
          display: inline-block;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: var(--pink);
          background: var(--pink-pale); padding: 5px 14px;
          border-radius: 30px; margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: var(--text); margin-bottom: 40px;
        }

        /* ---- ABOUT ---- */
        .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }

        .about-card {
          background: var(--card-bg); border-radius: var(--radius);
          padding: 28px 22px; text-align: center;
          box-shadow: var(--shadow); transition: transform 0.3s;
          border-top: 4px solid var(--pink-light);
        }
        .about-card:hover { transform: translateY(-6px); }
        .about-icon { font-size: 2.5rem; margin-bottom: 12px; }
        .about-card h3 { font-size: 1.1rem; color: var(--pink-dark); margin-bottom: 8px; }
        .about-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

        /* ---- SKILLS ---- */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }

        .skills-sub {
          font-size: 1rem; color: var(--pink-dark); font-weight: 600;
          margin-bottom: 20px; border-left: 4px solid var(--pink-light);
          padding-left: 12px;
        }

        .skill-bar-wrap { margin-bottom: 16px; }
        .skill-bar-label { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.88rem; font-weight: 500; }
        .skill-pct { color: var(--pink); }
        .skill-track { height: 8px; background: #fde8f2; border-radius: 8px; overflow: hidden; }
        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--pink-light), var(--pink));
          border-radius: 8px;
          transition: width 1.2s cubic-bezier(.4,0,.2,1);
        }

        .soft-skills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; }
        .soft-pill {
          background: var(--pink-pale); color: var(--pink-dark);
          padding: 7px 16px; border-radius: 30px; font-size: 0.85rem; font-weight: 500;
          border: 1.5px solid var(--pink-light);
          transition: background 0.2s, transform 0.2s;
        }
        .soft-pill:hover { background: var(--pink); color: white; transform: scale(1.04); }

        .quote-card {
          background: linear-gradient(135deg, var(--pink-pale), #fce4f3);
          border-radius: var(--radius); padding: 20px 18px;
          border-left: 4px solid var(--pink);
        }
        .quote-card p { font-style: italic; color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; }

        /* ---- EDUCATION ---- */
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before {
          content: ''; position: absolute; left: 12px; top: 0; bottom: 0;
          width: 2px; background: linear-gradient(to bottom, var(--pink-light), var(--pink-pale));
        }

        .timeline-item { position: relative; margin-bottom: 28px; display: flex; gap: 18px; align-items: flex-start; }
        .timeline-dot {
          position: absolute; left: -40px; top: 6px;
          width: 32px; height: 32px; border-radius: 50%;
          background: white; border: 3px solid var(--pink-light);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          box-shadow: 0 2px 10px rgba(214,51,132,0.15);
        }

        .timeline-card {
          background: var(--card-bg); border-radius: var(--radius);
          padding: 18px 22px; flex: 1;
          box-shadow: var(--shadow); transition: transform 0.3s;
        }
        .timeline-card:hover { transform: translateX(4px); }
        .timeline-year {
          display: inline-block; background: var(--pink); color: white;
          font-size: 0.75rem; padding: 3px 10px; border-radius: 20px; font-weight: 600;
          margin-bottom: 6px;
        }
        .timeline-degree { font-size: 1rem; font-weight: 600; color: var(--pink-dark); margin-bottom: 4px; }
        .timeline-school { font-size: 0.88rem; color: var(--text-muted); }

        /* ---- PROJECTS ---- */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }

        .project-card {
          background: var(--card-bg); border-radius: var(--radius);
          padding: 0; overflow: hidden;
          box-shadow: var(--shadow); transition: transform 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .project-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(214,51,132,0.18); }
        .project-accent { height: 5px; background: linear-gradient(90deg, var(--accent, var(--pink)), var(--pink-dark)); }
        .project-title { font-size: 1.05rem; font-weight: 700; color: var(--pink-dark); padding: 18px 22px 6px; }
        .project-desc { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; padding: 0 22px 14px; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 22px 20px; }
        .project-tag {
          background: var(--pink-pale); color: var(--pink-dark);
          font-size: 0.75rem; font-weight: 600;
          padding: 4px 12px; border-radius: 20px;
          border: 1px solid var(--pink-light);
        }

        /* ---- CONTACT ---- */
        .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 36px; align-items: start; }

        @media (max-width: 600px) { .contact-grid { grid-template-columns: 1fr; } }

        .contact-intro { font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; }
        .contact-detail {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
          font-size: 0.9rem; color: var(--text-muted);
        }
        .contact-detail a { color: var(--pink-dark); text-decoration: none; }
        .contact-detail a:hover { text-decoration: underline; }
        .contact-icon { font-size: 1.3rem; }

        .contact-form { display: flex; flex-direction: column; gap: 14px; }
        .contact-form input,
        .contact-form textarea {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid #ffd6e8; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 0.92rem;
          outline: none; background: white; color: var(--text);
          transition: border-color 0.2s;
        }
        .contact-form input:focus,
        .contact-form textarea:focus { border-color: var(--pink); }
        .contact-form textarea { resize: vertical; min-height: 110px; }

        .success-msg {
          background: #e6f9ee; color: #1a7a4a;
          padding: 12px 16px; border-radius: 10px;
          font-size: 0.9rem; font-weight: 500;
        }

        /* ---- FOOTER ---- */
        footer {
          text-align: center; padding: 24px;
          background: linear-gradient(135deg, #fce4f3, #ffb6c1);
          color: var(--pink-dark); font-size: 0.85rem;
        }

        /* ---- SCROLL TOP ---- */
        .scroll-top {
          position: fixed; bottom: 28px; right: 28px;
          width: 46px; height: 46px; border-radius: 50%;
          background: linear-gradient(135deg, var(--pink), var(--pink-dark));
          color: white; font-size: 1.2rem; border: none;
          cursor: pointer; box-shadow: 0 6px 20px rgba(214,51,132,0.35);
          z-index: 999; transition: transform 0.2s;
        }
        .scroll-top:hover { transform: scale(1.1); }
      `}</style>

      <Navbar active={active} />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
      <footer>
        <p>© 2026 Xyra Shane G. Fider — All Rights Reserved 🌸</p>
      </footer>
      <ScrollTop />
    </>
  );
}
