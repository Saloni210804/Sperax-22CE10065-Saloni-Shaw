import React, { useState } from 'react';
import { BrowserProvider } from 'ethers'; // Correct import

const WalletConnect = ({ setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum); // Correct provider
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default WalletConnect;
