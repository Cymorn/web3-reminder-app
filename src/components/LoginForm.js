import React from 'react';
import '../css/loginpage.css';  // Import the CSS file here

function LoginPage() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
