import React, { useState, useEffect } from 'react';
import Login_svg from '../../assets/Login-amico.svg';
import blog_svg from '../../assets/blobanimation.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        role: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);

    // Password strength checker
    useEffect(() => {
        if (user.password) {
            let strength = 0;
            if (user.password.length >= 8) strength += 25;
            if (user.password.match(/[a-z]+/)) strength += 25;
            if (user.password.match(/[A-Z]+/)) strength += 25;
            if (user.password.match(/[0-9]+/)) strength += 25;
            if (user.password.match(/[$@#&!]+/)) strength += 25;
            setPasswordStrength(Math.min(strength, 100));
        } else {
            setPasswordStrength(0);
        }
    }, [user.password]);

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!user.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (user.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (user.username.length > 20) {
            newErrors.username = 'Username must be less than 20 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!user.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(user.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!user.password) {
            newErrors.password = 'Password is required';
        } else if (user.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-z])/.test(user.password)) {
            newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(user.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*[0-9])/.test(user.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        // Confirm password validation
        if (!user.cpassword) {
            newErrors.cpassword = 'Please confirm your password';
        } else if (user.password !== user.cpassword) {
            newErrors.cpassword = 'Passwords do not match';
        }

        // Role validation
        if (!user.role.trim()) {
            newErrors.role = 'Profession is required';
        }

        // Terms validation
        if (!termsAccepted) {
            newErrors.terms = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = (field) => {
        setFocusedField(null);
    };

    const PostData = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please check your inputs', {
                icon: '⚠️',
                style: {
                    border: '1px solid #ff6b6b',
                    padding: '16px',
                    color: '#ff6b6b',
                },
            });
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading('Creating your account...');

        try {
           const response = await fetch("https://compilerx-backend02.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    cpassword: user.cpassword,
                    role: user.role,
                })
            });

            const data = await response.json();
            toast.dismiss(loadingToast);

            // ✅ FIXED: Changed from 201 to 200 to match backend
            if (response.status === 200) {
                toast.success('Registration Successful! 🎉', {
                    duration: 4000,
                    icon: '✅',
                    style: {
                        background: '#10b981',
                        color: '#fff',
                    },
                });
                
                // Store user email for login prefill (optional)
                localStorage.setItem('registeredEmail', user.email);
                
                setTimeout(() => navigate("/login"), 2000);
            }
            else if (response.status === 421) {
                toast.error('Email is already registered', {
                    icon: '📧',
                    duration: 4000,
                });
            }
            else if (response.status === 420) {
                toast.error('Passwords do not match', {
                    icon: '🔑',
                    duration: 4000,
                });
            }
            else if (response.status === 422) {
                toast.error('Please fill in all fields', {
                    icon: '⚠️',
                    duration: 4000,
                });
            }
            else {
                toast.error('Registration failed. Please try again.', {
                    icon: '❌',
                    duration: 4000,
                });
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Connection error. Please try again.', {
                icon: '🔌',
                duration: 4000,
            });
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const width2 = window.outerWidth;

    return (
        <div className="register-page">
            {/* Background decorations */}
            <div className="background-decorations">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
                <img className='blob-svg blob-1' src={blog_svg} alt="background-svg" />
                <img className='blob-svg blob-2' src={blog_svg} alt="background-svg" />
                <div className="grid-overlay"></div>
            </div>

            {/* Main container */}
            <div className="register-container">
                <div className="register-card">
                    {/* Left side - Registration Form */}
                    <div className="register-form-section">
                        <div className="form-header">
                            <h1 className="form-title">Create Account</h1>
                            <p className="form-subtitle">Join our amazing community today!</p>
                            <div className="title-decoration">
                                <span className="decoration-line"></span>
                                <span className="decoration-dot"></span>
                                <span className="decoration-line"></span>
                            </div>
                        </div>

                        <form className="register-form" onSubmit={PostData}>
                            <div className="form-grid">
                                {/* Username field */}
                                <div className={`form-group ${focusedField === 'username' ? 'focused' : ''} ${user.username ? 'filled' : ''}`}>
                                    <label htmlFor="username" className="form-label">
                                        <span className="label-icon">👤</span>
                                        <span className="label-text">Username</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="codofile"
                                            value={user.username}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('username')}
                                            onBlur={() => handleBlur('username')}
                                            className={`form-input ${errors.username ? 'error' : ''}`}
                                            disabled={isLoading}
                                        />
                                        <span className="input-border"></span>
                                        {user.username && !errors.username && (
                                            <span className="input-valid-icon">✓</span>
                                        )}
                                    </div>
                                    {errors.username && (
                                        <div className="error-message">
                                            <span className="error-icon">⚠️</span>
                                            <span className="error-text">{errors.username}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Email field */}
                                <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${user.email ? 'filled' : ''}`}>
                                    <label htmlFor="email" className="form-label">
                                        <span className="label-icon">📧</span>
                                        <span className="label-text">Email</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="CodoFile@gmail.com"
                                            value={user.email}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('email')}
                                            onBlur={() => handleBlur('email')}
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            disabled={isLoading}
                                        />
                                        <span className="input-border"></span>
                                        {user.email && !errors.email && (
                                            <span className="input-valid-icon">✓</span>
                                        )}
                                    </div>
                                    {errors.email && (
                                        <div className="error-message">
                                            <span className="error-icon">⚠️</span>
                                            <span className="error-text">{errors.email}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Password field */}
                                <div className={`form-group ${focusedField === 'password' ? 'focused' : ''} ${user.password ? 'filled' : ''}`}>
                                    <label htmlFor="password" className="form-label">
                                        <span className="label-icon">🔒</span>
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            placeholder="••••••"
                                            value={user.password}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('password')}
                                            onBlur={() => handleBlur('password')}
                                            className={`form-input ${errors.password ? 'error' : ''}`}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex="-1"
                                        >
                                            {showPassword ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                        <span className="input-border"></span>
                                    </div>
                                    
                                    {/* Password strength meter */}
                                    {user.password && (
                                        <div className="password-strength">
                                            <div className="strength-bars">
                                                <div className={`strength-bar ${passwordStrength >= 25 ? 'active' : ''}`}></div>
                                                <div className={`strength-bar ${passwordStrength >= 50 ? 'active' : ''}`}></div>
                                                <div className={`strength-bar ${passwordStrength >= 75 ? 'active' : ''}`}></div>
                                                <div className={`strength-bar ${passwordStrength >= 100 ? 'active' : ''}`}></div>
                                            </div>
                                            <span className="strength-text">
                                                {passwordStrength < 25 && 'Weak'}
                                                {passwordStrength >= 25 && passwordStrength < 50 && 'Fair'}
                                                {passwordStrength >= 50 && passwordStrength < 75 && 'Good'}
                                                {passwordStrength >= 75 && passwordStrength < 100 && 'Strong'}
                                                {passwordStrength >= 100 && 'Very Strong'}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {errors.password && (
                                        <div className="error-message">
                                            <span className="error-icon">⚠️</span>
                                            <span className="error-text">{errors.password}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password field */}
                                <div className={`form-group ${focusedField === 'cpassword' ? 'focused' : ''} ${user.cpassword ? 'filled' : ''}`}>
                                    <label htmlFor="cpassword" className="form-label">
                                        <span className="label-icon">🔐</span>
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="cpassword"
                                            id="cpassword"
                                            placeholder="••••••"
                                            value={user.cpassword}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('cpassword')}
                                            onBlur={() => handleBlur('cpassword')}
                                            className={`form-input ${errors.cpassword ? 'error' : ''}`}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            tabIndex="-1"
                                        >
                                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                        <span className="input-border"></span>
                                        {user.cpassword && user.password === user.cpassword && !errors.cpassword && (
                                            <span className="input-valid-icon">✓</span>
                                        )}
                                    </div>
                                    {errors.cpassword && (
                                        <div className="error-message">
                                            <span className="error-icon">⚠️</span>
                                            <span className="error-text">{errors.cpassword}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Profession field */}
                                <div className={`form-group ${focusedField === 'role' ? 'focused' : ''} ${user.role ? 'filled' : ''}`}>
                                    <label htmlFor="role" className="form-label">
                                        <span className="label-icon">💼</span>
                                        <span className="label-text">Profession</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            name="role"
                                            id="role"
                                            placeholder="Web Developer"
                                            value={user.role}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('role')}
                                            onBlur={() => handleBlur('role')}
                                            className={`form-input ${errors.role ? 'error' : ''}`}
                                            disabled={isLoading}
                                        />
                                        <span className="input-border"></span>
                                        {user.role && !errors.role && (
                                            <span className="input-valid-icon">✓</span>
                                        )}
                                    </div>
                                    {errors.role && (
                                        <div className="error-message">
                                            <span className="error-icon">⚠️</span>
                                            <span className="error-text">{errors.role}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Terms and conditions */}
                            <div className="terms-section">
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => {
                                            setTermsAccepted(e.target.checked);
                                            if (errors.terms) {
                                                setErrors({ ...errors, terms: '' });
                                            }
                                        }}
                                        disabled={isLoading}
                                    />
                                    <span className="checkbox-custom"></span>
                                    <span className="checkbox-label">
                                        I agree to the <a href="/terms" className="terms-link">Terms of Service</a> and <a href="/privacy" className="terms-link">Privacy Policy</a>
                                    </span>
                                </label>
                                {errors.terms && (
                                    <div className="error-message terms-error">
                                        <span className="error-icon">⚠️</span>
                                        <span className="error-text">{errors.terms}</span>
                                    </div>
                                )}
                            </div>

                            {/* Submit button */}
                            <button 
                                type="submit" 
                                className={`submit-button ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                <span className="button-content">
                                    {isLoading ? (
                                        <>
                                            <span className="spinner"></span>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="button-text">Create Account</span>
                                            <span className="button-icon">→</span>
                                        </>
                                    )}
                                </span>
                                <span className="button-glow"></span>
                            </button>
                        </form>
                    </div>

                    {/* Right side - SVG Illustration */}
                    <div className="register-illustration">
                        <div className="illustration-content">
                            <img src={Login_svg} alt="Register illustration" className="illustration-image" />
                            
                            <div className="illustration-text">
                                <h3 className="welcome-title">Join Codo File! 🚀</h3>
                                <p className="welcome-subtitle">Start your coding journey today</p>
                            </div>

                            {/* Benefits list */}
                            <div className="benefits-list">
                                <div className="benefit-item">
                                    <span className="benefit-icon">📚</span>
                                    <div className="benefit-text">
                                        <h4>Learn to Code</h4>
                                        <p>Access hundreds of coding tutorials</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">🤝</span>
                                    <div className="benefit-text">
                                        <h4>Join Community</h4>
                                        <p>Connect with fellow developers</p>
                                    </div>
                                </div>
                                <div className="benefit-item">
                                    <span className="benefit-icon">🏆</span>
                                    <div className="benefit-text">
                                        <h4>Earn Badges</h4>
                                        <p>Track your progress and achievements</p>
                                    </div>
                                </div>
                            </div>

                            {/* Login link */}
                            <div className="login-prompt">
                                <p className="prompt-text">
                                    Already have an account?
                                    <NavLink to="/login" className="login-link">
                                        <span className="link-text">Login Now</span>
                                        <span className="link-icon">→</span>
                                    </NavLink>
                                </p>
                            </div>

                            {/* Floating elements */}
                            <div className="floating-elements">
                                <div className="floating-element element-1">{'{ }'}</div>
                                <div className="floating-element element-2">{'< />'}</div>
                                <div className="floating-element element-3">{'() =>'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Screen size warning */}
                <div className="screen-warning">
                    <mark>
                        The Screen is Visible with width more than 250px 
                        <br /><br /><hr /><br />
                        Screen Size: {width2}px
                    </mark>
                </div>
            </div>
        </div>
    );
}

export default Register;