import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo.png';
import '../index.css';

function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [activeTab, setActiveTab] = useState('students');
  const [contactStatus, setContactStatus] = useState('idle');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const headerRef = useRef(null);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    // Trigger modal popup after 2 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    const headerOffset = 80;
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setMobileNavOpen(false);
    }
  };

  // Counter Animation
  useEffect(() => {
    const stats = document.querySelectorAll('.stat-number');
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count);
      const duration = 2000;
      const start = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toLocaleString();
        }
      };
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    return () => observer.disconnect();
  }, []);

  // Reveal Animation
  useEffect(() => {
    const elements = document.querySelectorAll(
        '.section-header, .about-image, .about-content, .program-card, ' +
        '.startups-content, .success-stories, .testimonial-card, ' +
        '.event-card, .contact-info, .contact-form-card, .stat-item'
    );

    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 50);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactStatus('submitting');
    setTimeout(() => {
      setContactStatus('success');
      e.target.reset();
      setTimeout(() => setContactStatus('idle'), 3000);
    }, 1000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    setTimeout(() => {
      setNewsletterStatus('success');
      e.target.reset();
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>🎓 New Course Alert: <strong>Computational Thinking for Beginners</strong> — Enrolling Now! 
          <a href="#programs" onClick={(e) => scrollToSection(e, 'programs')}>Learn More →</a>
        </p>
      </div>

      {/* Intuitive Animated Header */}
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
          <a href="#" className="logo" onClick={(e) => scrollToSection(e, 'home')}>
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
          </a>

          <nav className="nav desktop-nav">
            <ul className="nav-list">
              {['Home', 'About', 'Initiative', 'Courses', 'Startups', 'Success', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="nav-link"
                    onClick={(e) => scrollToSection(e, item.toLowerCase() === 'courses' ? 'programs' : item.toLowerCase())}
                  >
                    {item}
                    <motion.div className="nav-indicator" layoutId="navIndicator" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <motion.a 
              href="#programs" 
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => scrollToSection(e, 'programs')}
            >
              Browse Courses
            </motion.a>
            <motion.a 
              href="#contact" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Enroll Now
            </motion.a>
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

        {/* Mobile Navigation */}
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
                {['Home', 'About', 'Initiative', 'Courses', 'Startups', 'Success', 'Contact'].map((item) => (
                  <motion.li 
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="nav-link-mobile"
                      onClick={(e) => scrollToSection(e, item.toLowerCase() === 'courses' ? 'programs' : item.toLowerCase())}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Trusted by 10,000+ Students</span>
            </div>

            <h1 className="hero-title">
              Make Mathematics
              <span className="highlight"> Your Superpower</span>
            </h1>

            <p className="hero-desc">
              Join India's premier mathematics foundation. From school students to aspiring entrepreneurs,
              we make learning mathematics fun, practical, and transformative.
            </p>

            <div className="hero-cta">
              <a href="#programs" className="btn btn-primary btn-lg" onClick={(e) => scrollToSection(e, 'programs')}>
                <span>Explore Courses</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#about" className="btn btn-ghost btn-lg" onClick={(e) => scrollToSection(e, 'about')}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Introduction</span>
              </a>
            </div>

            <div className="hero-features">
              <div className="hero-feature">
                <div className="feature-check">✓</div>
                <span>Self-Paced Learning</span>
              </div>
              <div className="hero-feature">
                <div className="feature-check">✓</div>
                <span>Expert Instructors</span>
              </div>
              <div className="hero-feature">
                <div className="feature-check">✓</div>
                <span>Certified Courses</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card main-card">
              <img src={logo} alt="MSF" className="hero-logo" />
              <div className="card-content">
                <span className="card-label">Since 2002</span>
                <h3>20+ Years of Excellence</h3>
                <p>Transforming mathematical education in India</p>
              </div>
            </div>

            <div className="floating-card card-students">
              <div className="floating-icon">👨‍🎓</div>
              <div>
                <strong>10,000+</strong>
                <span>Students Trained</span>
              </div>
            </div>

            <div className="floating-card card-courses">
              <div className="floating-icon">📚</div>
              <div>
                <strong>50+</strong>
                <span>Active Courses</span>
              </div>
            </div>

            <div className="floating-card card-rating">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <span>4.9 Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-partners">
          <div className="container">
            <p>Partnered with leading institutions</p>
            <div className="partners-list">
              <span>ICICI Bank</span>
              <span>•</span>
              <span>Tata Interactive</span>
              <span>•</span>
              <span>University of Houston</span>
              <span>•</span>
              <span>Delhi University</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🎓</div>
              <div className="stat-number" data-count="20">0</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-number" data-count="10000">0</div>
              <div className="stat-label">Students Trained</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📖</div>
              <div className="stat-number" data-count="50">0</div>
              <div className="stat-label">Courses Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏆</div>
              <div className="stat-number" data-count="95">0</div>
              <div className="stat-label">% Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <div className="image-wrapper">
                <div className="image-bg"></div>
                <img src={logo} alt="MSF Logo" className="about-logo" />
              </div>
              <div className="about-badge">
                <span className="badge-number">2002</span>
                <span className="badge-text">Established</span>
              </div>
            </div>

            <div className="about-content">
              <span className="section-label">About Us</span>
              <h2 className="section-title">Shaping the Future of Mathematical Education</h2>

              <p className="about-lead">
                The Mathematical Sciences Foundation was established by leading Indian scientists,
                civil servants, and corporates with a mission to transform how mathematics is taught and
                learned.
              </p>

              <p>
                Based in Delhi, we connect mathematics with science, technology, and industry through
                innovative learning systems. Our programs span from school students to graduate researchers,
                and we're pioneering new initiatives like <strong>The Internet College</strong> and 
                <strong> The College of Startups</strong>.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🎯</div>
                  <div>
                    <h4>Our Mission</h4>
                    <p>Make mathematics accessible, enjoyable, and applicable for everyone.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🌟</div>
                  <div>
                    <h4>Our Vision</h4>
                    <p>A world where mathematical thinking empowers every individual.</p>
                  </div>
                </div>
              </div>

              <a href="#programs" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'programs')}>
                Discover Our Programs
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs" id="programs">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Our Courses</span>
            <h2 className="section-title">Learn at Your Own Pace</h2>
            <p className="section-desc">Online, hands-on courses designed to make learning mathematics engaging and practical</p>
          </div>

          <div className="programs-tabs">
            <button 
              className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`} 
              onClick={() => setActiveTab('students')}
            >For Students</button>
            <button 
              className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`} 
              onClick={() => setActiveTab('teachers')}
            >For Teachers</button>
            <button 
              className={`tab-btn ${activeTab === 'professionals' ? 'active' : ''}`} 
              onClick={() => setActiveTab('professionals')}
            >For Professionals</button>
          </div>

          <div className="programs-grid">
            <div className="program-card">
              <div className="card-badge">Popular</div>
              <div className="card-header">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6M9 13h6M9 17h4" />
                  </svg>
                </div>
                <div className="card-level">All Levels</div>
              </div>
              <h3>Computational Thinking</h3>
              <p>Master logical reasoning and problem-solving approaches that form the foundation of programming.</p>
              <div className="card-meta">
                <span className="meta-item">📹 24 Videos</span>
                <span className="meta-item">⏱️ 8 Weeks</span>
              </div>
              <a href="#contact" className="card-btn" onClick={(e) => scrollToSection(e, 'contact')}>Enroll Now →</a>
            </div>

            <div className="program-card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                <div className="card-level">Middle School</div>
              </div>
              <h3>Learn Math with Computers</h3>
              <p>Fun and interactive mathematics learning using computer tools. Perfect for curious young minds.</p>
              <div className="card-meta">
                <span className="meta-item">📹 18 Videos</span>
                <span className="meta-item">⏱️ 6 Weeks</span>
              </div>
              <a href="#contact" className="card-btn" onClick={(e) => scrollToSection(e, 'contact')}>Enroll Now →</a>
            </div>

            <div className="program-card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9M13 17V5M8 17v-3" />
                  </svg>
                </div>
                <div className="card-level">Class 9-12</div>
              </div>
              <h3>Statistics & Probability</h3>
              <p>Comprehensive statistics courses aligned with CBSE curriculum. Build strong analytical foundations.</p>
              <div className="card-meta">
                <span className="meta-item">📹 32 Videos</span>
                <span className="meta-item">⏱️ 10 Weeks</span>
              </div>
              <a href="#contact" className="card-btn" onClick={(e) => scrollToSection(e, 'contact')}>Enroll Now →</a>
            </div>

            <div className="program-card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
                  </svg>
                </div>
                <div className="card-level">College</div>
              </div>
              <h3>Essential Digital Skills</h3>
              <p>Digital competencies every college student needs. From basics to advanced productivity tools.</p>
              <div className="card-meta">
                <span className="meta-item">📹 20 Videos</span>
                <span className="meta-item">⏱️ 4 Weeks</span>
              </div>
              <a href="#contact" className="card-btn" onClick={(e) => scrollToSection(e, 'contact')}>Enroll Now →</a>
            </div>

            <div className="program-card teacher-card">
              <div className="card-badge teacher">For Teachers</div>
              <div className="card-header">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="card-level">Educators</div>
              </div>
              <h3>GeoGebra for Classrooms</h3>
              <p>Transform your teaching with powerful GeoGebra visualization. Engage students like never before.</p>
              <div className="card-meta">
                <span className="meta-item">📹 15 Videos</span>
                <span className="meta-item">⏱️ 3 Weeks</span>
              </div>
              <a href="#contact" className="card-btn" onClick={(e) => scrollToSection(e, 'contact')}>Enroll Now →</a>
            </div>

            <div className="program-card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}>
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="card-level">Beginners</div>
              </div>
              <h3>Data Analysis with Excel</h3>
              <p>Get started with data analysis and statistics using Microsoft Excel. No prior experience needed.</p>
              <div className="card-meta">
                <span className="meta-item">📹 22 Videos</span>
                <span className="meta-item">⏱️ 5 Weeks</span>
              </div>
              <a href="#contact" className="card-btn" onClick={(e) => scrollToSection(e, 'contact')}>Enroll Now →</a>
            </div>
          </div>

          <div className="programs-cta">
            <p>Can't find what you're looking for?</p>
            <a href="#contact" className="btn btn-outline" onClick={(e) => scrollToSection(e, 'contact')}>Request a Custom Course</a>
          </div>
        </div>
      </section>

      {/* Startups Section */}
      <section className="startups" id="startups">
        <div id="initiative" style={{ position: 'absolute', top: '-100px' }}></div>
        <div className="container">
          <div className="startups-grid">
            <div className="startups-content">
              <span className="section-label">The College of Startups</span>
              <h2 className="section-title">Turn Your Ideas Into Reality</h2>
              <p>
                Our unique startup incubation program nurtures aspiring entrepreneurs with mentorship,
                resources, and hands-on experience. From ideation to launch, we're with you every step.
              </p>

              <div className="startup-benefits">
                <div className="benefit">
                  <span className="benefit-icon">💡</span>
                  <div>
                    <strong>Idea Development</strong>
                    <p>Transform concepts into viable business models</p>
                  </div>
                </div>
                <div className="benefit">
                  <span className="benefit-icon">🧑‍🏫</span>
                  <div>
                    <strong>Expert Mentorship</strong>
                    <p>Learn from successful entrepreneurs</p>
                  </div>
                </div>
                <div className="benefit">
                  <span className="benefit-icon">🔧</span>
                  <div>
                    <strong>Hands-on Projects</strong>
                    <p>Work on real-world challenges</p>
                  </div>
                </div>
                <div className="benefit">
                  <span className="benefit-icon">🚀</span>
                  <div>
                    <strong>Launch Support</strong>
                    <p>Resources to bring your startup to market</p>
                  </div>
                </div>
              </div>

              <a href="#contact" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'contact')}>Join the Program →</a>
            </div>

            <div className="success-stories">
              <h3>Our Success Stories</h3>

              <div className="story-card">
                <div className="story-icon">📱</div>
                <div className="story-content">
                  <h4>Gray: The School App</h4>
                  <p>Revolutionizing school management with cutting-edge technology. Now serving 100+ schools.</p>
                  <span className="story-tag">EdTech • 2019</span>
                </div>
              </div>

              <div className="story-card">
                <div className="story-icon">📐</div>
                <div className="story-content">
                  <h4>Math Ed Labs</h4>
                  <p>Innovative educational technology solutions making math learning interactive and fun.</p>
                  <span className="story-tag">Education • 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Student Stories</span>
            <h2 className="section-title">What Our Learners Say</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The Computational Thinking course changed how I approach problems. Now I'm pursuing
                computer science with confidence. MSF made the difference!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AK</div>
                <div>
                  <strong>Ananya Kumar</strong>
                  <span>Class 12 Student, Delhi</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card featured">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "As a teacher, the GeoGebra course was a game-changer. My students are now more engaged
                than ever. The hands-on approach makes complex concepts easy to visualize."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RS</div>
                <div>
                  <strong>Rajesh Sharma</strong>
                  <span>Math Teacher, Pune</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The Statistics course helped me crack my entrance exams. The way concepts are explained
                with real examples made it so easy to understand and remember."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PM</div>
                <div>
                  <strong>Priya Menon</strong>
                  <span>Engineering Student, Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events/CTA Section */}
      <section className="events-cta">
        <div className="container">
          <div className="events-grid">
            <div className="event-card">
              <div className="event-icon">🏆</div>
              <h3>MSF Challenge</h3>
              <p>Annual coding and mathematics competition for school students. Win prizes and recognition!</p>
              <a href="#contact" className="event-link" onClick={(e) => scrollToSection(e, 'contact')}>Learn More →</a>
            </div>

            <div className="event-card">
              <div className="event-icon">🧮</div>
              <h3>Recognizing Ramanujan</h3>
              <p>Celebrating mathematical genius. Show your unique problem-solving skills and creativity.</p>
              <a href="#contact" className="event-link" onClick={(e) => scrollToSection(e, 'contact')}>Participate →</a>
            </div>

            <div className="event-card">
              <div className="event-icon">🎓</div>
              <h3>A Life of Mathematics</h3>
              <p>Exclusive seminar series featuring distinguished mathematicians from around the world.</p>
              <a href="#contact" className="event-link" onClick={(e) => scrollToSection(e, 'contact')}>Register →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Start Your Learning Journey Today</h2>
              <p>Join thousands of learners transforming their mathematical abilities. Get course updates and free resources.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="Enter your email address" required />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={newsletterStatus === 'submitting'}
                style={{ 
                  background: newsletterStatus === 'success' ? '#10b981' : undefined,
                  borderColor: newsletterStatus === 'success' ? '#10b981' : undefined,
                  color: newsletterStatus === 'success' ? 'white' : undefined 
                }}
              >
                {newsletterStatus === 'submitting' ? 'Subscribing...' : 
                 newsletterStatus === 'success' ? '✓ Subscribed!' : 'Subscribe Free'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title">We'd Love to Hear From You</h2>
              <p>Have questions about our courses? Want to collaborate? Reach out and we'll get back to you soon.</p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div>
                    <strong>Location</strong>
                    <p>Delhi, India</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">📧</div>
                  <div>
                    <strong>Email</strong>
                    <p>info@mathscifound.org</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🌐</div>
                  <div>
                    <strong>Website</strong>
                    <p>www.mathscifound.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">I'm interested in...</label>
                  <select id="subject" name="subject" required defaultValue="">
                    <option value="" disabled>Select an option</option>
                    <option value="courses">Enrolling in a Course</option>
                    <option value="startups">College of Startups</option>
                    <option value="teaching">Teaching Opportunities</option>
                    <option value="partnership">Partnerships</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" placeholder="Tell us more about how we can help..." required></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-full"
                  disabled={contactStatus === 'submitting'}
                  style={{ 
                    background: contactStatus === 'success' ? '#10b981' : undefined,
                    borderColor: contactStatus === 'success' ? '#10b981' : undefined
                  }}
                >
                  {contactStatus === 'submitting' ? 'Sending...' : 
                   contactStatus === 'success' ? '✓ Message Sent!' : (
                    <>
                      Send Message
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
                   )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Film Festival Modal Pop-up */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
              zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #020410 0%, #0B0E25 100%)',
                borderRadius: '30px', padding: '3rem', maxWidth: '600px', width: '90%',
                position: 'relative', textAlign: 'center', color: 'white',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <button 
                onClick={() => setShowModal(false)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
              
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)', zIndex: 0 }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'inline-block', color: '#FFD700', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>Upcoming Event</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                  <span style={{ color: '#FFD700' }}>Ramanujan</span> <br/> <span style={{ color: '#FFD700', fontStyle: 'italic' }}>Film Festival</span>
                </h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Join us for a cinematic journey where logic meets creativity. Explore short films that bring mathematical concepts to life.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <Link to="/filmfestival" style={{ textDecoration: 'none' }}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      style={{ background: '#FFD700', color: '#020410', padding: '1rem 2rem', borderRadius: '999px', fontWeight: 800, border: 'none', cursor: 'pointer' }}
                    >
                      Explore Festival
                    </motion.button>
                  </Link>
                  <button 
                    onClick={() => setShowModal(false)}
                    style={{ background: 'transparent', color: '#fff', padding: '1rem 2rem', borderRadius: '999px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
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
                  <li><a href="#programs" onClick={(e) => scrollToSection(e, 'programs')}>Online Courses</a></li>
                  <li><a href="#programs" onClick={(e) => scrollToSection(e, 'programs')}>Teacher Training</a></li>
                  <li><a href="#startups" onClick={(e) => scrollToSection(e, 'startups')}>College of Startups</a></li>
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
                  <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</a></li>
                  <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
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

export default Home;