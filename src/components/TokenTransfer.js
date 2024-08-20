// src/components/TokenTransfer.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const TokenTransfer = ({ tokenAddress, account }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const transferTokens = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const erc20Abi = [
        "function transfer(address to, uint256 amount) returns (bool)",
      ];
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
      const tx = await tokenContract.transfer(recipient, ethers.utils.parseEther(amount));
      await tx.wait();
      alert("Transfer successful!");
    } catch (error) {
      console.error("Error transferring tokens", error);
    }
  };

  return (
    <div>
      <h3>Transfer Tokens</h3>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={transferTokens}>Transfer</button>
    </div>
  );
};

export default TokenTransfer;
