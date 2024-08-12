// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

const App = () => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    setError(null);
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`
      );
      const rate = response.data.rates[targetCurrency];
      setConvertedAmount(amount * rate);
    } catch (err) {
      setError('Error fetching conversion rate');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Currency Converter</h1>
      <div className="form-group">
        <label className="label">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">From:</label>
        <select
          value={sourceCurrency}
          onChange={(e) => setSourceCurrency(e.target.value)}
          className="select"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="label">To:</label>
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="select"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleConvert} className="button">Convert</button>
      {error && <p className="error">{error}</p>}
      {convertedAmount !== null && (
        <p className="result">
          {amount} {sourceCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
        </p>
      )}
    </div>
  );
};

export default App;
