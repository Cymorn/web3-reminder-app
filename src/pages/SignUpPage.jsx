import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loginpage.css'; // Reuse the same styles

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // TODO: Add real sign-up logic here (e.g. API call or storage)
    alert(`Welcome, ${formData.fullname}! Account created.`);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <button onClick={() => navigate('/')}>Log In</button></p>
    </div>
  );
}
