import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const QuoteGenerator = () => {
  const [quoteData, setQuoteData] = useState({
    quote: '',
    author: ''
  });

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': 'Enter your API' }, 
        params: { category: 'happiness' } 
      });

      console.log(response.data); 
      if (response.data.length > 0) {
        const { quote, author } = response.data[0];
        setQuoteData({ quote, author });
      } else {
        setQuoteData({ quote: 'No quote found', author: 'Unknown' });
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuoteData({ quote: 'Error fetching quote', author: 'Unknown' });
    }
  };

  useEffect(() => {
    fetchQuote(); 
  }, []);

  return (
    <div className="card">
      <h1 className="heading">"{quoteData.quote}"</h1>
      <p className="author">- {quoteData.author}</p>
      <button className="button" onClick={fetchQuote}>
        <span>Generate New Quote</span>
      </button>
    </div>
  );
};

export default QuoteGenerator;
