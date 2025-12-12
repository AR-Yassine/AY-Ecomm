import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1>About AY E-Comm</h1>
        <p>
          AY E-Comm is a modern online shop focused on delivering stylish,
          high-quality products with a smooth and simple shopping experience.
        </p>
      </section>

      {/* STORY */}
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          AY E-Comm started as a small student project and quickly grew into a
          full concept for a real e-commerce platform. The goal is to combine
          clean design, fast performance, and a user-friendly interface that
          feels professional and trustworthy.
        </p>
      </section>

      {/* MISSION & VALUES */}
      <section className="about-grid">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To make online shopping easy, safe, and enjoyable by focusing on
            clear design, honest information, and a smooth checkout experience.
          </p>
        </div>

        <div className="about-card">
          <h3>What We Care About</h3>
          <ul>
            <li>Fast & secure shopping</li>
            <li>Clean and responsive UI on all devices</li>
            <li>Friendly support and quick replies</li>
            <li>Continuous improvement & new features</li>
          </ul>
        </div>
      </section>

      {/* STATS / HIGHLIGHTS */}
      <section className="about-stats">
        <div className="stat-card">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Available Online</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">100%</span>
          <span className="stat-label">Responsive Design</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">Student</span>
          <span className="stat-label">Project & Portfolio</span>
        </div>
      </section>
    </div>
  );
}

export default About;
