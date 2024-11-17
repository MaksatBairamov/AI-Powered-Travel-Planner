import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversionRate = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${currencyFrom}`
        );
        const data = await response.json();
        setConversionRate(data.rates[currencyTo]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };
    fetchConversionRate();
  }, [currencyFrom, currencyTo]);

  return (
    <div className="currency-converter">
      <h3>Currency Converter</h3>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
      </label>
      <label>
        From:
        <select
          value={currencyFrom}
          onChange={(e) => setCurrencyFrom(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CHF">CHF</option>
          <option value="UAH">UAH</option>
        </select>
      </label>
      <label>
        To:
        <select
          value={currencyTo}
          onChange={(e) => setCurrencyTo(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CHF">CHF</option>
          <option value="UAH">UAH</option>
        </select>
      </label>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <h4>
          {amount} {currencyFrom} = {(amount * conversionRate).toFixed(2)}{" "}
          {currencyTo}
        </h4>
      )}
    </div>
  );
};

export default CurrencyConverter;
