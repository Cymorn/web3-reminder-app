import React, { useEffect, useState } from 'react';
import '../css/DashboardPage.css'; // Reuse your existing styles

export default function CryptoPage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickerCoins, setTickerCoins] = useState([]);


 useEffect(() => {
  const fetchCrypto = () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(res => res.json())
      .then(data => setTickerCoins(data.slice(0, 10)))
      .catch(err => console.error("Crypto fetch error:", err));
    };

   // Fetch immediately
    fetchCrypto();

    // Then fetch every 10 seconds
   const interval = setInterval(fetchCrypto, 10000);

  // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel">
      <h2>🌍 Live Crypto Market Updates</h2>
      {loading ? (
        <p>Loading prices...</p>
      ) : (
        coins.slice(0, 10).map(coin => (
          <div key={coin.id} className="project-card">
            <p><strong>{coin.name} ({coin.symbol.toUpperCase()})</strong></p>
            <p>💲 Price: ${coin.current_price.toLocaleString()}</p>
            <p>📈 2s Change: 
              <span style={{ color: coin.price_change_percentage_2s >= 0 ? 'green' : 'red' }}>
                {' '}{coin.price_change_percentage_2s.toFixed(2)}%
              </span>
            </p>
            <p>📊 Market Cap: ${coin.market_cap.toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
