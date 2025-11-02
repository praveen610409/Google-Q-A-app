import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HistoryCard from './components/HistoryCard';
import './App.css';

export default function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);

  const askQuestion = async () => {
    if (!question.trim()) return alert('Please enter a question!');
    try {
      const res = await axios.post('http://localhost:5000/api/search', { question });
      setAnswer(res.data.answer);
      fetchHistory();
    } catch {
      setAnswer('Error fetching answer');
    }
  };

  const fetchHistory = async () => {
    const res = await axios.get('http://localhost:5000/api/history');
    setHistory(res.data);
  };

  useEffect(() => { fetchHistory(); }, []);

  return (
    <div className="app">
      <h1>🔍 Google Q&A App</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={askQuestion}>Ask</button>

      <h3>Answer:</h3>
      <p>{answer}</p>

      <h3>🕓 Recent History</h3>
      <div className="history">
        {Array.isArray(history) && history.length > 0
          ? history.map((q, i) => <HistoryCard key={i} data={q} />)
          : <p>No history yet.</p>}
      </div>
    </div>
  );
}
