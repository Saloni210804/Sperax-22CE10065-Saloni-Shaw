// src/App.js
import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import WatchList from './components/WatchList';

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <h1>Crypto Portfolio App</h1>
      <WalletConnect setAccount={setAccount} />
      {account && <WatchList account={account} />}
    </div>
  );
}

export default App;
