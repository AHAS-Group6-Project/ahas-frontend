import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser({ email, password });

      // Save user session details
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Navigate based on user role
      if (data.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '80px auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '24px',
    },
    formGroup: {
      marginBottom: '16px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    errorMessage: {
      color: '#e74c3c',
      backgroundColor: '#fdf2f2',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '16px',
      textAlign: 'center',
    },
    footerText: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#666',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>AHAS System Login</h2>
      {error && <div style={styles.errorMessage}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>
        <div style={styles.formGroup}>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>
        <button type="submit" style={styles.button}>Log In</button>
      </form>

      {/* Footer link to Register page */}
      <p style={styles.footerText}>
        Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;