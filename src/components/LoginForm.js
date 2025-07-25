import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import '../css/loginpage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");

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
      <h2>Web3 Reminder App</h2>

      {/* Traditional Login */}
      <form onSubmit={handleUsernameLogin}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* MetaMask Login */}
      <button onClick={handleMetaMaskLogin}>
        Login with MetaMask
      </button>

      {walletAddress && (
        <p style={{ marginTop: "10px" }}>Connected as: {walletAddress}</p>
      )}
    </div>
  );

  <div className="login-container">
  <h2>Web3 Reminder App</h2>

  <form onSubmit={handleUsernameLogin} className="login-form">
    <input type="text" placeholder="Username" required />
    <input type="password" placeholder="Password" required />
    <button type="submit">Log In</button>
  </form>

  <div className="divider">OR</div>

  <button className="metamask-button" onClick={handleMetaMaskLogin}>
    Login with MetaMask
  </button>
</div>

}
