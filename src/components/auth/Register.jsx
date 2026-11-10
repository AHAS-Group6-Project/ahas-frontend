import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await registerUser({ name, email, password, role });

      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));

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
      maxWidth: '420px',
      margin: '60px auto',
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
    label: {
      display: 'block',
      marginBottom: '6px',
      color: '#555',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#28a745',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '10px',
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
      <h2 style={styles.heading}>Create AHAS Account</h2>
      {error && <div style={styles.errorMessage}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input 
            type="email" 
            placeholder="email@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Register As</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            style={styles.select}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Register</button>
      </form>

      <p style={styles.footerText}>
        Already have an account? <Link to="/login" style={styles.link}>Log In</Link>
      </p>
    </div>
  );
};

export default Register;