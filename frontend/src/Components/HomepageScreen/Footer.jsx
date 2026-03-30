import React, { useEffect, useRef } from 'react';
import './Footer.css'; // Create this CSS file

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    const footerRef = useRef(null);

    useEffect(() => {
        // Intersection Observer for scroll animation
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('footer-visible');
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    return (
        <footer className="modern-footer" ref={footerRef}>
            {/* Animated background waves */}
            <div className="footer-waves">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
            </div>

            {/* Main footer content */}
            <div className="footer-content">
                <div className="footer-container">
                    {/* Decorative elements */}
                    <div className="footer-decoration">
                        <div className="floating-heart">
                            <span className="heart-pulse">❤️</span>
                        </div>
                        <div className="floating-code">
                            <span className="code-bracket">{'<'}</span>
                            <span className="code-slash">/</span>
                            <span className="code-bracket">{'>'}</span>
                        </div>
                    </div>

                    {/* Copyright text with animation */}
                    <div className="copyright-wrapper">
                        <p className="copyright-text">
                            <span className="copyright-symbol">©</span>
                            <span className="year">{year}</span>
                            <span className="divider">•</span>
                            <span className="developed-text">Developed & Designed with</span>
                            <span className="heart-emoji" aria-label="love">❤️</span>
                            <span className="by-text">by</span>
                            <a 
                                className="footer-link" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                href="https://shashankfolio.netlify.app/"
                            >
                                <span className="link-text">Shashank Jaiswal</span>
                                <span className="link-underline"></span>
                                <span className="link-icon">↗</span>
                            </a>
                        </p>
                    </div>

                    {/* Social links (optional) */}
                    <div className="social-links">
                        <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                            <span className="social-icon">📧</span>
                        </a>
                        <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                            <span className="social-icon">💼</span>
                        </a>
                        <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                            <span className="social-icon">🐱</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom gradient bar */}
            <div className="footer-bottom-bar"></div>
        </footer>
    );
}

export default Footer;