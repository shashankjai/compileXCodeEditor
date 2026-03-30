import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import blob from '../../assets/blobanimation.svg';
import './LandingPage.css';

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`landingContainer ${isVisible ? 'visible' : ''}`}>
      
      {/* Animated background blobs (Atmosphere) */}
      <img src={blob} alt="" className='blob blob1' />
      <img src={blob} alt="" className='blob blob2' />
      
      {/* Floating particles (Code Syntax) */}
      <div className="floating-particles">
        <span className="particle" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>{'</>'}</span>
        <span className="particle" style={{ top: '25%', left: '85%', animationDelay: '2s' }}>{'{ }'}</span>
        <span className="particle" style={{ top: '70%', left: '15%', animationDelay: '4s' }}>{'<div>'}</span>
        <span className="particle" style={{ top: '80%', left: '90%', animationDelay: '1s' }}>{'();'}</span>
        <span className="particle" style={{ top: '50%', left: '5%', animationDelay: '3s' }}>{'#'}</span>
        <span className="particle" style={{ top: '60%', left: '95%', animationDelay: '5s' }}>{'[]'}</span>
      </div>

      {/* Main Hero Content */}
      <div className="landingContent">
        
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Version 2.0 is live</span>
        </div>

        <div className="title-wrapper">
          <h1 className="main-title">
            🚀 Code. Compile. Conquer.
          </h1>
        </div>

        <p className="tagline creative-text">
          Write and run <span className="highlight">HTML, CSS, JavaScript, Python, Dart, and Java</span> instantly — plus convert <span className="highlight">Image to Text</span> and <span className="highlight">Voice to Text</span> in one <span className="highlight">fast, secure, and powerful platform</span> built for creators.
        </p>
        
        {/* Professional CTA Buttons */}
        <div className="cta-group">
          <Link to="/register" className="cta-button primary">
            Start Coding Free
          </Link>
        </div>

        {/* Powered by section REMOVED as requested */}

      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;