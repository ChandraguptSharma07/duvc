import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import infinity from '../assets/infinity.png';
import MetallicPaint from '../components/MetallicPaint';
import CardSwap, { Card } from '../components/CardSwap';
import GlassIcons from '../components/GlassIcons';
import ProfileCard from '../components/ProfileCard';

const ParallaxShapes = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Subtle Geometric Background Elements */}
      <motion.div style={{ y: y1, rotate, position: 'absolute', top: '10%', right: '-5%', opacity: 0.05 }}>
        <svg width="400" height="400" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#0B0E25" strokeWidth="0.5" fill="none" />
          <path d="M50 10 L90 90 L10 90 Z" stroke="#0B0E25" strokeWidth="0.5" fill="none" />
        </svg>
      </motion.div>
      <motion.div style={{ y: y1, x: -50, position: 'absolute', top: '40%', left: '-5%', opacity: 0.05 }}>
        <svg width="300" height="300" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" stroke="#0B0E25" strokeWidth="0.5" fill="none" />
        </svg>
      </motion.div>
    </div>
  );
};

const FilmFestival = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false); // Auto-scroll state
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const cardSwapRef = useRef(null);
  const manualInteractionRef = useRef(false);

  const { scrollY } = useScroll();

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoScrollPaused && !manualInteractionRef.current && scrollContainerRef.current) {
         scroll('right', true); // Pass auto flag
      }
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [autoScrollPaused]);
  
  // "Bubble Reveal" Effect - Rising Half Circle
  // Grows from 0% to 150% radius from 400px to 1400px scroll
  const clipRadius = useTransform(scrollY, [400, 1400], ['0%', '150%']);
  const clipPath = useMotionTemplate`circle(${clipRadius} at 50% 100%)`; // Centered at the very bottom edge

  // Transform Header background transparency/color
  const headerBg = useTransform(scrollY, [800, 1000], ['rgba(2, 4, 16, 0.8)', 'rgba(255, 255, 255, 0.95)']);
  
  // Transform Text colors for Header (White -> Dark)
  const textColor = useTransform(scrollY, [800, 1000], ['#ffffff', '#0B0E25']);
  
  // Decorative Lines Color (Light -> Dark)
  const lineColor = useTransform(scrollY, [800, 1000], ['rgba(255, 255, 255, 0.15)', 'rgba(11, 14, 37, 0.15)']);
  
  // Invert logo filter based on scroll (White -> Color/Dark)
  const logoFilter = useTransform(scrollY, [800, 1000], ['brightness(0) invert(1)', 'none']);

  const scroll = (direction, isAuto = false) => {
    if (!isAuto) {
        manualInteractionRef.current = true;
        setTimeout(() => { manualInteractionRef.current = false; }, 4000);
    }
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const { scrollLeft, scrollWidth, clientWidth } = current;
      const scrollAmount = 350;

      if (direction === 'left') {
        if (scrollLeft <= 10) {
            // Loop to end
             current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
             current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        // Right
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            // Loop to start
            current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Header Box Shadow Effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 100) {
          headerRef.current.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        } else {
          headerRef.current.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="film-festival-page" style={{ 
      backgroundColor: '#020410', // Default dark background
      minHeight: '100vh', 
      color: 'var(--gray-900)',
      overflowX: 'hidden',
      position: 'relative',
      fontFamily: 'var(--font-primary)'
    }}>
      {/* White Layer that gets revealed via clip-path */}
      <motion.div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#ffffff',
          zIndex: 0,
          clipPath: clipPath,
          pointerEvents: 'none' // Let clicks pass through to underlying if needed, though this is bg
        }}
      />

      <ParallaxShapes />

      {/* Decorative Side Lines */}
      <motion.div style={{ 
        position: 'fixed', 
        left: 'clamp(10px, 4%, 40px)', 
        top: 0, 
        bottom: 0, 
        width: '1px', 
        background: lineColor, 
        zIndex: 40,
        pointerEvents: 'none'
      }} />
      <motion.div style={{ 
        position: 'fixed', 
        right: 'clamp(10px, 4%, 40px)', 
        top: 0, 
        bottom: 0, 
        width: '1px', 
        background: lineColor, 
        zIndex: 40,
        pointerEvents: 'none'
      }} />

      {/* Navigation - Adaptive Header */}
      <motion.header 
        className="header" 
        id="header" 
        ref={headerRef} 
        style={{ 
          background: headerBg, 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="container">
          <Link to="/" className="logo">
            <motion.img src={logo} alt="MSF Logo" className="logo-img" style={{ filter: logoFilter }} />
            <div className="logo-text">
              <motion.span className="logo-name" style={{ color: textColor }}>Mathematical Sciences</motion.span>
              <motion.span className="logo-sub" style={{ color: textColor }}>Foundation</motion.span>
            </div>
          </Link>

          <nav className={`nav ${mobileNavOpen ? 'active' : ''}`} id="nav">
            <ul className="nav-list">
              <li><Link to="/#home" className="nav-link"><motion.span style={{ color: textColor }}>Home</motion.span></Link></li>
              <li><Link to="/#about" className="nav-link"><motion.span style={{ color: textColor }}>About</motion.span></Link></li>
              <li><Link to="/#programs" className="nav-link"><motion.span style={{ color: textColor }}>Courses</motion.span></Link></li>
              <li><Link to="/#startups" className="nav-link"><motion.span style={{ color: textColor }}>Startups</motion.span></Link></li>
              <li><Link to="/#testimonials" className="nav-link"><motion.span style={{ color: textColor }}>Success</motion.span></Link></li>
              <li><Link to="/#contact" className="nav-link"><motion.span style={{ color: textColor }}>Contact</motion.span></Link></li>
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/#programs" className="btn btn-outline" style={{ color: 'inherit', borderColor: 'currentColor' }}><motion.span style={{ color: textColor }}>Browse Courses</motion.span></Link>
            <Link to="/#contact" className="btn btn-primary">Enroll Now</Link>
          </div>

          <button 
            className={`mobile-toggle ${mobileNavOpen ? 'active' : ''}`} 
            id="mobile-toggle" 
            aria-label="Menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <motion.span style={{ background: textColor }}></motion.span>
            <motion.span style={{ background: textColor }}></motion.span>
            <motion.span style={{ background: textColor }}></motion.span>
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        position: 'relative',
        zIndex: 10,
        // No background color here, letting the main container show through
      }}>
        {/* Metallic Paint Decorative Background - Large Original Liquid Metal Look */}
        <div style={{ 
          position: 'absolute', 
          width: '140%', 
          height: '140%', 
          top: '-20%', 
          left: '-20%', 
          opacity: 0.8, // Higher opacity to see the white on white better
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
           <MetallicPaint
             imageSrc={infinity}
             // Pattern
             seed={42}
             scale={3}
             patternSharpness={1}
             noiseScale={0.4}
             // Animation
             speed={0.25}
             liquid={0.8}
             mouseAnimation={false}
             // Visual
             brightness={2.5} // Increased brightness for better white-on-white visibility
             contrast={0.6}
             refraction={0.02}
             blur={0.01}
             chromaticSpread={2}
             fresnel={1}
             angle={15}
             waveAmplitude={1.2}
             distortion={1.2}
             contour={0.3}
             // Colors - Original Liquid Metal Colors
             lightColor="#ffffff"
             darkColor="#000000"
             tintColor="#ffffff"
           />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span style={{ 
              display: 'inline-block', 
              padding: '0.5rem 1rem', 
              background: 'rgba(255,255,255,0.1)', // Glassy effect on dark
              backdropFilter: 'blur(5px)',
              borderRadius: '999px', 
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '0.875rem', 
              fontWeight: 600, 
              color: '#FFD700', // Gold text
              marginBottom: '1.5rem',
            }}>
              ✨ MSF Film Festival
            </span>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              marginBottom: '1.5rem', 
              lineHeight: 1.1,
              fontFamily: "'Playfair Display', serif", 
              color: '#FFFFFF' // White Text for Dark Background
            }}>
              Recognizing <br />
              <span style={{ color: '#FFD700', fontStyle: 'italic' }}>Ramanujan </span> 
            </h1>
            <p style={{ 
              maxWidth: '600px', 
              margin: '0 auto 3rem', 
              fontSize: '1.25rem', 
              color: '#ffffff', 
              lineHeight: 1.8,
              fontWeight: 500,
              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)'
            }}>
              Where the infinite complexity of mathematics meets the boundless creativity of cinema.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(45deg, #FFD700, #FDB931)', // Gold Button
                color: '#0B0E25',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                fontSize: '1.125rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
              }}
            >
              Explore Selections
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Glass Icons Schedule Section - Replaces Bento Grid */}
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            style={{ fontSize: '2.5rem', color: '#0B0E25', marginBottom: '3rem', textAlign: 'center', fontFamily: "'Playfair Display', serif" }}
          >
            Festival Events
          </motion.h2>

          <GlassIcons 
            items={[
              { 
                label: 'Opening Ceremony', 
                color: 'gold', 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> 
              },
              { 
                label: 'Short Film Showcase', 
                color: 'black', 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/></svg> 
              },
              { 
                label: 'Awards Night', 
                color: 'gold', 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 21h8m-4-3v3M12 18a8 8 0 100-16 8 8 0 000 16z"/></svg> 
              },
              { 
                label: 'Panel Discussion', 
                color: 'black', 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> 
              }
            ]}
          />
        </div>
      </section>

      {/* Competition Details Section */}
      <section style={{ padding: '8rem 0', position: 'relative', zIndex: 10, overflow: 'visible' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', gap: '2rem' }}>
          
          <button 
            onClick={() => cardSwapRef.current?.prev()} 
            className="nav-arrow" 
            aria-label="Previous Card"
            style={{ zIndex: 20 }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <CardSwap 
            ref={cardSwapRef}
            width={300} 
            height={220} 
            delay={3500} 
            pauseOnHover={true}
            cardDistance={60} 
            verticalDistance={40} 
          >
            <Card style={{ background: '#fff', border: '1px solid #fee2e2' }}>
              <div style={{ 
                width: '70px', height: '70px', marginBottom: '1.5rem', 
                background: '#fef2f2', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#8b1a32'
              }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0B0E25' }}>Team Size</h3>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>3-5 Members</p>
            </Card>

            <Card style={{ background: '#fff', border: '1px solid #e0f2fe' }}>
              <div style={{ 
                width: '70px', height: '70px', marginBottom: '1.5rem', 
                background: '#f0f9ff', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0284c7'
              }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0B0E25' }}>Eligibility</h3>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>Enrolled Students</p>
            </Card>

            <Card style={{ background: '#fff', border: '1px solid #fef3c7' }}>
              <div style={{ 
                width: '70px', height: '70px', marginBottom: '1.5rem', 
                background: '#fffbeb', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#d97706'
              }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0B0E25' }}>Deadline</h3>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>15 Feb 2026</p>
            </Card>

            <Card style={{ background: '#fff', border: '1px solid #f3e8ff' }}>
              <div style={{ 
                width: '70px', height: '70px', marginBottom: '1.5rem', 
                background: '#fdf4ff', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#a855f7'
              }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0B0E25' }}>Prizes</h3>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', fontWeight: 600 }}>₹15k • ₹10k • ₹5k</p>
            </Card>
          </CardSwap>

          <button 
            onClick={() => cardSwapRef.current?.next()} 
            className="nav-arrow" 
            aria-label="Next Card"
            style={{ zIndex: 20 }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </section>

      {/* Film Strip Carousel Section */}
      <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#0B0E25', fontFamily: "'Playfair Display', serif" }}>Official Selections</h2>
          </div>

          <div style={{ 
            position: 'relative',
            padding: '40px 0',
          }}
          onMouseEnter={() => setAutoScrollPaused(true)}
          onMouseLeave={() => setAutoScrollPaused(false)}
          >
            <button 
              onClick={() => scroll('left')} 
              className="nav-arrow" 
              aria-label="Scroll Left"
              style={{ 
                position: 'absolute', 
                left: '-20px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 20 
              }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div 
              ref={scrollContainerRef}
              style={{ 
                display: 'flex', 
                gap: '6rem', // Increased gap
                overflowX: 'auto', 
                padding: '20px 60px',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                height: '550px', 
                alignItems: 'center'
              }}
              className="hide-scrollbar"
            >
              {[
                { title: "The Golden Ratio", director: "Sarah Jenkins", color: "#e0e7ff" },
                { title: "Fractal Dreams", director: "Rajiv Patel", color: "#fee2e2" },
                { title: "Zero to Infinity", director: "Elena Rostova", color: "#d1fae5" },
                { title: "The Calculus of Hope", director: "David Chen", color: "#e0e7ff" },
                { title: "Geometric Nature", director: "Anita Roy", color: "#f3e8ff" },
                { title: "Chaos Theory", director: "Marcus Webb", color: "#fae8ff" }
              ].map((film, index) => (
                <div key={index} style={{ width: '280px', flexShrink: 0 }}> {/* Reduced width */}
                  <ProfileCard 
                    name={film.title}
                    title={`Dir. ${film.director}`}
                    avatarUrl={`https://placehold.co/400x600/0B0E25/FFF?text=${film.title.replace(/ /g, '+')}`} // Dynamic placeholder
                    miniAvatarUrl={`https://placehold.co/100x100/FFD700/000?text=Dir`}
                    handle="Official Selection"
                    status="2026"
                    contactText="View Details"
                    enableTilt={true}
                    showUserInfo={true}
                    className="film-card-instance"
                  />
                </div>
              ))}
            </div>

            <button 
              onClick={() => scroll('right')} 
              className="nav-arrow" 
              aria-label="Scroll Right"
              style={{ 
                position: 'absolute', 
                right: '-20px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 20 
              }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Standard Light Footer (inherits from index.css) */}
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600;700&display=swap');

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .nav-arrow {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid var(--gray-200);
          background: #fff;
          color: #0B0E25;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: var(--shadow);
        }
        .nav-arrow:hover {
          background: #0B0E25;
          color: #fff;
        }

        @media (max-width: 768px) {
          .bento-large {
            grid-column: span 1 !important;
          }
          h1 {
            font-size: 3.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FilmFestival;
