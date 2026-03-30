import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Login_svg from '../../assets/Back-to-work-pana.png';
import blog_svg from '../../assets/blobanimation.svg';
import { toast } from 'react-hot-toast';
import { UsedContext } from '../App';
import './Login.css'; // Create this CSS file

function Login() {
  const { state, dispatch } = useContext(UsedContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Check for saved credentials
  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      setFormData(prev => ({ ...prev, username: savedUsername }));
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = (field) => {
    setFocusedField(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    
    // Validate form
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
    const loadingToast = toast.loading('Logging in...');

    try {
      const response = await fetch('https://compilerx-backend02.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      toast.dismiss(loadingToast);

      if (response.status === 200) {
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', formData.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }

        dispatch({ type: 'USER', payload: true });
        
        toast.success('Login Successful! 🎉', {
          duration: 4000,
          icon: '✅',
          style: {
            background: '#10b981',
            color: '#fff',
          },
        });
        
        // Add success animation before redirect
        setTimeout(() => navigate('/'), 1500);
      } 
      else if (response.status === 401) {
        toast.error('Account not found. Please register first.', {
          icon: '📝',
          duration: 4000,
        });
      }
      else if (response.status === 402) {
        toast.error('Incorrect password. Please try again.', {
          icon: '🔑',
          duration: 4000,
        });
      }
      else if (response.status === 403) {
        toast.error('Please fill in all fields.', {
          icon: '⚠️',
          duration: 4000,
        });
      }
      else {
        toast.error('Invalid credentials. Please check your username and password.', {
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
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background decorations */}
      <div className="background-decorations">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <img className="blob-svg blob-1" src={blog_svg} alt="background-svg" />
        <img className="blob-svg blob-2" src={blog_svg} alt="background-svg" />
        <div className="grid-overlay"></div>
      </div>

      {/* Main container */}
      <div className="login-container">
        <div className="login-card">
          {/* Left side - SVG Illustration */}
          <div className="login-illustration">
            <div className="illustration-content">
              <img src={Login_svg} alt="Login illustration" className="illustration-image" />
              
              <div className="illustration-text">
                <h3 className="welcome-title">Welcome Back! 👋</h3>
                <p className="welcome-subtitle">We're so excited to see you again!</p>
              </div>

              {/* Feature list */}
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">🚀</span>
                  <span>Access your coding projects</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💬</span>
                  <span>Connect with the community</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Track your progress</span>
                </div>
              </div>

              {/* Register link */}
              <div className="register-prompt">
                <p className="prompt-text">
                  Don't have an account? 
                  <NavLink to="/register" className="register-link">
                    <span className="link-text">Create Account</span>
                    <span className="link-icon">→</span>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="login-form-section">
            <div className="form-header">
              <h1 className="form-title">Login</h1>
              <p className="form-subtitle">Enter your credentials to access your account</p>
            </div>

            <form className="login-form" onSubmit={loginUser} method="POST">
              {/* Username field */}
              <div className={`form-group ${focusedField === 'username' ? 'focused' : ''} ${formData.username ? 'filled' : ''}`}>
                <label htmlFor="username" className="form-label">
                  <span className="label-icon">👤</span>
                  <span className="label-text">Username</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('username')}
                    onBlur={() => handleBlur('username')}
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    disabled={isLoading}
                  />
                  <span className="input-border"></span>
                  {formData.username && !errors.username && (
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

              {/* Password field */}
              <div className={`form-group ${focusedField === 'password' ? 'focused' : ''} ${formData.password ? 'filled' : ''}`}>
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔒</span>
                  <span className="label-text">Password</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    tabIndex="-1"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                  <span className="input-border"></span>
                  {formData.password && !errors.password && (
                    <span className="input-valid-icon">✓</span>
                  )}
                </div>
                {errors.password && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">Remember me</span>
                </label>
                
                <NavLink to="/forgot-password" className="forgot-link">
                  Forgot password?
                </NavLink>
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
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span className="button-text">Login</span>
                      <span className="button-icon">→</span>
                    </>
                  )}
                </span>
                <span className="button-glow"></span>
              </button>

              {/* Social login (optional) */}
              <div className="social-login">
                <p className="social-text">Or continue with</p>
                <div className="social-buttons">
                  <button type="button" className="social-button google">
                    <span className="social-icon">G</span>
                    <span className="social-name">Google</span>
                  </button>
                  <button type="button" className="social-button github">
                    <span className="social-icon">GH</span>
                    <span className="social-name">GitHub</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Screen size warning (kept from original) */}
        <div className="screen-warning">
          <mark>
            The Screen is Visible with width more than 250px 
            <br/><br/><hr/><br/>
            Screen Size: {window.outerWidth}px
          </mark>
        </div>
      </div>
    </div>
  );
}

export default Login;