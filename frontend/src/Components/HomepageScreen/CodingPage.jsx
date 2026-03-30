import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './CodingPage.css'; // You'll need to create this CSS file

function CodingPage(props) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation to children
            if (entry.target === sectionRef.current) {
              setTimeout(() => {
                if (contentRef.current) contentRef.current.classList.add('slide-in');
                if (imageRef.current) imageRef.current.classList.add('fade-in-scale');
              }, 200);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="coding-section" ref={sectionRef}>
      <div className="coding-container">
        {/* Background decoration */}
        <div className="bg-decoration">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-grid"></div>
        </div>

        {/* Main content */}
        <div className="content-wrapper">
          <div className="header-wrapper">
            <span className="section-badge">{props.badge || 'Featured'}</span>
            <h1 className="section-title">{props.title}</h1>
            <div className="title-underline"></div>
          </div>

          <div 
            className={`coding-content ${props.reverse ? 'reverse' : ''}`} 
            id={props.uniId}
            style={props.poss}
          >
            {/* Information side */}
            <div className="info-side" ref={contentRef}>
              <div className="info-card">
                <div className="info-header">
                  <div className="info-icon">
                    <svg className="sparkle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3 className="info-subtitle">Learn & Grow</h3>
                </div>
                
                <div className="info-description">
                  {props.info}
                </div>

                <div className="feature-list">
                  <div className="feature-item">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Interactive Learning</span>
                  </div>
                  <div className="feature-item">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Expert Guidance</span>
                  </div>
                  <div className="feature-item">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Real Projects</span>
                  </div>
                </div>

                <NavLink to={props.path} className="cta-button-wrapper">
                  <button className="cta-button">
                    <span className="button-text">{props.con}</span>
                    <span className="button-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="button-glow"></span>
                  </button>
                </NavLink>
              </div>
            </div>

            {/* Image side */}
            <div className="image-side" ref={imageRef}>
              <div className="image-container">
                <div className="image-frame">
                  <div className="image-glow"></div>
                  <img
                    src={props.image}
                    alt="Coding illustration"
                    className="coding-image"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="floating-element float-1">
                  <div className="float-content">
                    <span className="float-icon">⚡</span>
                    <span className="float-text">Fast</span>
                  </div>
                </div>
                <div className="floating-element float-2">
                  <div className="float-content">
                    <span className="float-icon">🎯</span>
                    <span className="float-text">Precise</span>
                  </div>
                </div>
                <div className="floating-element float-3">
                  <div className="float-content">
                    <span className="float-icon">✨</span>
                    <span className="float-text">Modern</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CodingPage;