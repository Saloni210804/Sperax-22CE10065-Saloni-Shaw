import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract, formatEther } from 'ethers';

const WatchList = ({ account }) => {
  const [watchList, setWatchList] = useState([]);
  const [tokenAddress, setTokenAddress] = useState("");
  const [balances, setBalances] = useState({});

  const addTokenToWatchList = () => {
    setWatchList([...watchList, tokenAddress]);
    setTokenAddress("");
  };

  const fetchTokenBalance = async (tokenAddress) => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
      ];
      const tokenContract = new Contract(tokenAddress, erc20Abi, provider);
      const balance = await tokenContract.balanceOf(account);
      setBalances(prev => ({ ...prev, [tokenAddress]: formatEther(balance) }));
    } catch (error) {
      console.error("Error fetching token balance", error);
    }
  };

  useEffect(() => {
    watchList.forEach(token => fetchTokenBalance(token));
  }, [watchList]);

  return (
    <div>
      <h3>Your Watch List</h3>
      <input
        type="text"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        placeholder="Enter Token Address"
      />
      <button onClick={addTokenToWatchList}>Add Token</button>

      <ul>
        {watchList.map(token => (
          <li key={token}>
            {token}: {balances[token] ? `${balances[token]} ETH` : "Loading..."}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
