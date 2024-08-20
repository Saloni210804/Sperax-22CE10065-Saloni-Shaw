// src/components/Allowance.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const Allowance = ({ tokenAddress, account }) => {
  const [spenderAddress, setSpenderAddress] = useState("");
  const [allowance, setAllowance] = useState(null);

  const checkAllowance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20Abi = [
        "function allowance(address owner, address spender) view returns (uint256)",
      ];
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);
      const allowance = await tokenContract.allowance(account, spenderAddress);
      setAllowance(ethers.utils.formatEther(allowance));
    } catch (error) {
      console.error("Error checking allowance", error);
    }
  };

  return (
    <div>
      <h3>Check Token Allowance</h3>
      <input
        type="text"
        value={spenderAddress}
        onChange={(e) => setSpenderAddress(e.target.value)}
        placeholder="Enter Spender Address"
      />
      <button onClick={checkAllowance}>Check Allowance</button>
      {allowance && <p>Allowance: {allowance} ETH</p>}
    </div>
  );
};

export default Allowance;
