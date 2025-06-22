import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import '../css/loginpage.css';

export default function LoginPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleUsernameLogin = (e) => {
    e.preventDefault();
    // TODO: Add real login validation here
    navigate("/dashboard");
  };

  const handleMetaMaskLogin = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert("MetaMask not detected! Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      navigate('/dashboard');
    } catch (error) {
      console.error("MetaMask login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Project Reminder</h2>

      {/* Traditional Login */}
      <form onSubmit={handleUsernameLogin}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />

        
        <button className='log-in-button' type="submit">Log In</button>
      </form>

       <hr style={{ margin: "20px 0" }} />

      <h3>Sign up if you don't have an account</h3>
      <button className="signup-button" type="button" onClick={() => navigate('/signup')}>Sign Up</button>

      <hr style={{ margin: "20px 0" }} />

      {/* MetaMask Login */}
      <button className='metamask-button' onClick={handleMetaMaskLogin}>
        Login with MetaMask
      </button>

      {walletAddress && (
        <p style={{ marginTop: "10px" }}>Connected as: {walletAddress}</p>
      )}
    </div>
  );
}
