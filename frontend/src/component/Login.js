import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  // ✅ Auto-clear messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
  };

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/users/login', {
        username,
        password,
      });

      console.log('Login response:', response.data);

      const successMsg = response.data?.message || 'Login Successful!';
      setMessage(successMsg);
      setIsLoggedIn(true);

      // ✅ Save user info in localStorage
      localStorage.setItem('username', username);

      // ✅ Redirect to customer list after success
      navigate('/customerlist');
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errorMessage ||
        'Login failed. Please try again.';
      setMessage(errorMsg);
      setIsLoggedIn(false);
    }
  };

  // ✅ Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/users/register', {
        username,
        password,
      });

      console.log('Register response:', response.data);

      const successMsg = response.data?.message || 'Registered Successfully!';
      setMessage(successMsg);
      setIsRegisterMode(false);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Register error:', error);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errorMessage ||
        'Registration failed. Please try again.';
      setMessage(errorMsg);
    }
  };

  // ✅ Toggle Login/Register mode
  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setMessage('');
    setUsername('');
    setPassword('');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#eedfd9ff' }}
    >
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h2 className="text-center mb-4">
          {isRegisterMode ? 'Register' : 'Login'}
        </h2>

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>

        {/* ✅ Feedback message */}
        {message && (
          <div
            className={`alert mt-3 text-center ${
              isLoggedIn ? 'alert-success' : 'alert-danger'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <button onClick={toggleMode} className="btn btn-link w-100 mt-2">
          {isRegisterMode
            ? 'Already have an account? Login'
            : 'New user? Register here'}
        </button>
      </div>
    </div>
  );
};

export default Login;
