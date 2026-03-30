import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import './Feedback.css'; // Create this CSS file

function Feedback() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        feedback: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const formRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const submitData = async (e) => {
        e.preventDefault();
        
        const { name, email, feedback } = userData;

        // Validation
        if (!name || !email || !feedback) {
            toast.error('Please fill in all fields', {
                style: {
                    border: '1px solid #ff6b6b',
                    padding: '16px',
                    color: '#ff6b6b',
                    background: '#fff5f5',
                },
                icon: '⚠️',
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address', {
                icon: '📧',
            });
            return;
        }

        setIsSubmitting(true);
        
        const loadingToast = toast.loading('Sending your message...', {
            style: {
                background: '#4a90e2',
                color: '#fff',
            },
        });

        try {
            const response = await fetch(
                'https://reactformwebsite-79b28-default-rtdb.firebaseio.com/codoFileFeedback.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        feedback,
                        timestamp: new Date().toISOString(),
                    }),
                }
            );

            if (response.ok) {
                toast.dismiss(loadingToast);
                toast.success('Message sent successfully! 🎉', {
                    duration: 4000,
                    style: {
                        background: '#10b981',
                        color: '#fff',
                    },
                    icon: '✅',
                });
                
                setUserData({ name: '', email: '', feedback: '' });
                
                // Add success animation to form
                if (formRef.current) {
                    formRef.current.classList.add('form-success');
                    setTimeout(() => {
                        formRef.current.classList.remove('form-success');
                    }, 1000);
                }
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong. Please try again!', {
                icon: '❌',
                style: {
                    background: '#ef4444',
                    color: '#fff',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="feedback-section" ref={sectionRef}>
            {/* Animated background */}
            <div className="section-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
                <div className="grid-pattern"></div>
            </div>

            <div className="feedback-container">
                {/* Header Section */}
                <div className="feedback-header">
                    <div className="header-badge">
                        <span className="badge-icon">🤝</span>
                        <span className="badge-text">Let's Connect</span>
                    </div>
                    
                    <h1 className="feedback-title">
                        Let's Work <span className="title-highlight">Together</span>
                    </h1>
                    
                    <div className="title-decoration">
                        <span className="decoration-line"></span>
                        <span className="decoration-dot"></span>
                        <span className="decoration-line"></span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="feedback-content">
                    {/* Info Side */}
                    <div className="info-side">
                        <div className="info-card">
                            <div className="info-card-content">
                                <div className="info-icon-container">
                                    <div className="info-icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="info-title">Join Our Amazing Community</h3>
                                
                                <div className="info-highlights">
                                    <div className="highlight-item">
                                        <span className="highlight-icon">✨</span>
                                        <p>For Being <mark className="highlight-mark">Amazing</mark></p>
                                    </div>
                                    
                                    <div className="highlight-item">
                                        <span className="highlight-icon">🚀</span>
                                        <p>Become a part of <mark className="highlight-mark">CompileX</mark></p>
                                    </div>
                                    
                                    <div className="highlight-item">
                                        <span className="highlight-icon">💡</span>
                                        <p>Share your <mark className="highlight-mark">ideas & feedback</mark></p>
                                    </div>
                                </div>

                                <div className="info-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">500+</span>
                                        <span className="stat-label">Community Members</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="stat-item">
                                        <span className="stat-number">24/7</span>
                                        <span className="stat-label">Support Available</span>
                                    </div>
                                </div>

                                {/* Animated dots */}
                                <div className="animated-dots">
                                    <div className="dot dot-1"></div>
                                    <div className="dot dot-2"></div>
                                    <div className="dot dot-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="form-side">
                        <div className="form-card" ref={formRef}>
                            <div className="form-card-header">
                                <h2 className="form-title">Send a Message</h2>
                                <p className="form-subtitle">We'd love to hear from you!</p>
                            </div>

                            <form onSubmit={submitData} className="feedback-form">
                                {/* Name Field */}
                                <div className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${userData.name ? 'filled' : ''}`}>
                                    <label htmlFor="name" className="form-label">
                                        <span className="label-icon">👤</span>
                                        <span className="label-text">Your Name</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={userData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('name')}
                                            onBlur={handleBlur}
                                            className="form-input"
                                            placeholder="John Doe"
                                            disabled={isSubmitting}
                                        />
                                        <span className="input-border"></span>
                                    </div>
                                    {userData.name && (
                                        <span className="input-valid-icon">✓</span>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${userData.email ? 'filled' : ''}`}>
                                    <label htmlFor="email" className="form-label">
                                        <span className="label-icon">📧</span>
                                        <span className="label-text">Email Address</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={userData.email}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('email')}
                                            onBlur={handleBlur}
                                            className="form-input"
                                            placeholder="john@example.com"
                                            disabled={isSubmitting}
                                        />
                                        <span className="input-border"></span>
                                    </div>
                                    {userData.email && (
                                        <span className="input-valid-icon">✓</span>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div className={`form-group ${focusedField === 'feedback' ? 'focused' : ''} ${userData.feedback ? 'filled' : ''}`}>
                                    <label htmlFor="feedback" className="form-label">
                                        <span className="label-icon">💬</span>
                                        <span className="label-text">Your Message</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <textarea
                                            name="feedback"
                                            id="feedback"
                                            value={userData.feedback}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('feedback')}
                                            onBlur={handleBlur}
                                            className="form-textarea"
                                            placeholder="Tell us about your ideas, feedback, or suggestions..."
                                            rows="5"
                                            disabled={isSubmitting}
                                        />
                                        <span className="input-border"></span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="form-group">
                                    <button 
                                        type="submit" 
                                        className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        <span className="button-content">
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner"></span>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="button-text">Say a Word?</span>
                                                    <span className="button-icon">→</span>
                                                </>
                                            )}
                                        </span>
                                        <span className="button-glow"></span>
                                    </button>
                                </div>
                            </form>

                            {/* Form Footer */}
                            <div className="form-footer">
                                <p className="footer-text">
                                    <span className="footer-icon">🔒</span>
                                    Your information is safe with us
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Feedback;