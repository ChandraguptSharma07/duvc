import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo.png';
import '../index.css';

function Initiatives() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const { scrollY } = useScroll();

  const headerY = useTransform(scrollY, [0, 50], [0, -5]);
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.05)']
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Film Festival Ribbon */}
      <motion.div 
        initial="rest"
        whileHover="hover"
        animate="rest"
        onClick={() => {
          const el = document.getElementById('festival-details');
          if (el) {
            const offset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }}
        style={{ 
          background: '#020410', 
          color: '#FFD700', 
          padding: '10px 0', 
          textAlign: 'center', 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          letterSpacing: '1px',
          borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
          position: 'relative',
          zIndex: 101,
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span>🎬 Ramanujan Film Festival • Feb 2026</span>
          <span style={{ fontSize: '0.8em', opacity: 0.8 }}>▼</span>
        </div>

        {/* Hover Information */}
        <motion.div
          variants={{
            rest: { height: 0, opacity: 0, padding: 0 },
            hover: { height: 'auto', opacity: 1, padding: '10px 0' }
          }}
          style={{
            overflow: 'hidden',
            background: '#0a0f2c',
            color: '#e2e8f0',
            fontSize: '0.8rem',
            fontWeight: 400
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <span>📅 <strong>Date:</strong> Feb 15-16, 2026</span>
            <span>🏆 <strong>Prizes:</strong> ₹30,000 Total</span>
            <span>📍 <strong>Location:</strong> Main Campus</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Header - Identical to Home */}
      <motion.header 
        className="header" 
        style={{ 
          y: headerY,
          backgroundColor: headerBackground,
          boxShadow: headerShadow,
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div className="container">
          <Link to="/" className="logo">
            <motion.img 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              src={logo} 
              alt="MSF Logo" 
              className="logo-img" 
            />
            <div className="logo-text">
              <span className="logo-name">Mathematical Sciences</span>
              <span className="logo-sub">Foundation</span>
            </div>
          </Link>

          <nav className="nav desktop-nav">
            <ul className="nav-list">
              <li><Link to="/#home" className="nav-link">Home</Link></li>
              <li><Link to="/#about" className="nav-link">About</Link></li>
              <li><Link to="/#programs" className="nav-link">Courses</Link></li>
              <li><Link to="/#startups" className="nav-link">Startups</Link></li>
              <li><Link to="/#contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/#programs" className="btn btn-outline">Browse Courses</Link>
            <Link to="/#contact" className="btn btn-primary">Enroll Now</Link>
          </div>

          <button 
            className={`mobile-toggle ${mobileNavOpen ? 'active' : ''}`} 
            aria-label="Menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav 
              className="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="nav-list-mobile">
                <li><Link to="/" onClick={() => setMobileNavOpen(false)}>Home</Link></li>
                <li><Link to="/#about" onClick={() => setMobileNavOpen(false)}>About</Link></li>
                <li><Link to="/#programs" onClick={() => setMobileNavOpen(false)}>Courses</Link></li>
                <li><Link to="/#startups" onClick={() => setMobileNavOpen(false)}>Startups</Link></li>
                <li><Link to="/#contact" onClick={() => setMobileNavOpen(false)}>Contact</Link></li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="hero" style={{ padding: '6rem 0 4rem', background: 'linear-gradient(180deg, var(--primary-50) 0%, var(--white) 100%)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="hero-badge" style={{ margin: '0 auto 1.5rem' }}>
            <span className="badge-icon">🚀</span>
            <span>Initiative One</span>
          </div>
          <h1 className="hero-title">
            The Internet <span className="highlight">College</span>
          </h1>
          <p className="hero-desc" style={{ margin: '0 auto' }}>
            A place for modern learning and growth. Redefining education for the digital age through mentored peer learning and real-world exploration.
          </p>
        </div>
      </section>

      {/* Introduction & Philosophy */}
      <section className="about" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="about-grid" style={{ alignItems: 'start' }}>
            <div className="about-content">
              <span className="section-label">Introduction</span>
              <h2 className="section-title">A Cutting-Edge Knowledge Platform</h2>
              <p className="about-lead">
                The Internet College is dedicated to providing a diverse array of courses through a unique approach of mentored peer learning.
              </p>
              <p>
                We aim to equip learners with essential <strong>employability skills</strong>, ensuring they are prepared for the dynamic demands of the modern workforce. Our platform operates through innovative technology that blends learning with real-world adventures.
              </p>
            </div>
            <div className="about-content" style={{ background: 'var(--gray-50)', padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
              <span className="section-label">Philosophy</span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Experiential Learning</h3>
              <p>
                Our approach is deeply connected to addressing <strong>societal needs and challenges</strong>. We believe in "knowledge in action," ensuring that students gain practical, hands-on knowledge rather than just theoretical concepts.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🤝</div>
                  <div>
                    <h4>Mentored Peer Learning</h4>
                    <p>Collaborative growth guided by experts.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🌍</div>
                  <div>
                    <h4>Real-World Impact</h4>
                    <p>Solving actual societal problems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Aims */}
      <section className="stats" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Our Goals</span>
            <h2 className="section-title">Aims & Objectives</h2>
          </div>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="stat-item">
              <div className="stat-icon">🎓</div>
              <div className="stat-label" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--gray-900)' }}>Redefine Education</div>
              <p style={{ marginTop: '0.5rem', color: 'var(--gray-600)' }}>Transforming education into knowledge in action for personal fulfillment.</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💼</div>
              <div className="stat-label" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--gray-900)' }}>Create Creators</div>
              <p style={{ marginTop: '0.5rem', color: 'var(--gray-600)' }}>Empowering individuals to become job creators, not just job seekers.</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🔥</div>
              <div className="stat-label" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--gray-900)' }}>Discover Passion</div>
              <p style={{ marginTop: '0.5rem', color: 'var(--gray-600)' }}>Unearthing true callings through exposure to practical situations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="programs" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Broad Spectrum of Skills</h2>
            <p className="section-desc">Delivered through a democratic medium, both online and offline, in a hybrid mode.</p>
          </div>
          <div className="programs-grid">
            <div className="program-card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'var(--accent-blue)', color: 'white' }}>🗣️</div>
                <div className="card-level">Communication</div>
              </div>
              <h3>English Language</h3>
              <p>Mastering communication skills essential for the global workspace.</p>
            </div>
            <div className="program-card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'var(--accent-purple)', color: 'white' }}>💻</div>
                <div className="card-level">Technology</div>
              </div>
              <h3>Data Sciences</h3>
              <p>Cutting-edge technology and data analysis skills for the future.</p>
            </div>
            <div className="program-card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'var(--accent-orange)', color: 'white' }}>🎨</div>
                <div className="card-level">Creative</div>
              </div>
              <h3>Humanities</h3>
              <p>Fostering creativity through humanities and creative disciplines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="newsletter" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' }}>
        <div className="container">
          <div className="newsletter-content" style={{ alignItems: 'flex-start' }}>
            <div className="newsletter-text" style={{ flex: 1 }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', fontWeight: 'bold' }}>Vision</span>
              <h2 style={{ color: 'white', marginTop: '0.5rem' }}>Discover Your Inner Drumbeat</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '1rem', fontSize: '1.1rem' }}>
                The only meaning and purpose of education is to enable each individual young mind to discover her true calling in life.
              </p>
            </div>
            <div className="newsletter-form" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: 'var(--radius-xl)', backdropFilter: 'blur(10px)' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem', fontWeight: 'bold' }}>Mission</span>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginTop: '0.5rem' }}>Enable the Young by Redefining Education</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '1rem' }}>
                We strive to create an environment where knowledge meets action, leading to personal fulfillment and societal contribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="contact" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-label">The Context</span>
              <h2 className="section-title">Why Change is Needed</h2>
              <p>Traditional systems are failing to meet the needs of large segments of society. We are addressing critical gaps in the current educational landscape.</p>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon" style={{ 
                    background: '#fee2e2', 
                    color: '#ef4444', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0 
                  }}>✕</div>
                  <div>
                    <strong>Disconnected from Reality</strong>
                    <p>Institutions are often removed from national needs.</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon" style={{ 
                    background: '#fee2e2', 
                    color: '#ef4444', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0 
                  }}>✕</div>
                  <div>
                    <strong>Rote Learning</strong>
                    <p>Curiosity and innovation are discouraged.</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon" style={{ 
                    background: '#fee2e2', 
                    color: '#ef4444', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0 
                  }}>✕</div>
                  <div>
                    <strong>Actionless Knowledge</strong>
                    <p>Failure to understand that knowledge without action is meaningless.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--gray-50)', border: 'none' }}>
              <blockquote style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--gray-800)', borderLeft: '4px solid var(--primary)', paddingLeft: '1.5rem' }}>
                "What you do with your hands enters your heart."
              </blockquote>
              <cite style={{ display: 'block', marginTop: '1rem', color: 'var(--gray-600)', fontWeight: 'bold' }}>— Gandhi's Dictum</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Film Festival Highlights - Bottom Details Section */}
      <section id="festival-details" style={{ padding: '6rem 0', background: '#020410', color: 'white', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#FFD700', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Event Spotlight</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', margin: '1rem 0', lineHeight: 1.2 }}>
                <span style={{ color: '#FFD700' }}>Ramanujan</span> <span style={{ color: '#FFD700', fontStyle: 'italic' }}>Film Festival</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Celebrate the intersection of mathematics and cinema. Join students, educators, and creators for a two-day event featuring screenings, panel discussions, and awards.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>15+</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Short Films</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>₹30k</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Prize Pool</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>2</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Days of Magic</div>
                </div>
              </div>
              <Link to="/filmfestival" onClick={() => window.scrollTo(0, 0)} className="btn btn-primary" style={{ background: '#FFD700', color: '#020410', border: 'none', fontWeight: 700 }}>
                Visit Festival Website
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                background: 'linear-gradient(45deg, #FFD700, #ff8c00)', 
                borderRadius: '20px', 
                padding: '3px',
                transform: 'rotate(2deg)'
              }}>
                <div style={{ background: '#0a0f2c', borderRadius: '18px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <span style={{ fontSize: '5rem', filter: 'grayscale(1)', opacity: 0.2 }}>🎬</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Identical to Home */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <img src={logo} alt="MSF Logo" className="footer-logo" />
              <p className="footer-tagline">Empowering minds through mathematics since 2002</p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
                <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                <a href="#" className="social-link" aria-label="YouTube">▶</a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-col">
                <h4>Programs</h4>
                <ul>
                  <li><Link to="/#programs">Online Courses</Link></li>
                  <li><Link to="/#programs">Teacher Training</Link></li>
                  <li><Link to="/#startups">College of Startups</Link></li>
                  <li><a href="#">Research Programs</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">Study Materials</a></li>
                  <li><a href="#">Blog & Articles</a></li>
                  <li><a href="#">Events Calendar</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/#about">About Us</Link></li>
                  <li><Link to="/#contact">Contact</Link></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Press</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Mathematical Sciences Foundation. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Initiatives;
