import React from 'react';
import './HistoryCard.css'; // ✅ नई CSS फ़ाइल जोड़ी

export default function HistoryCard({ data }) {
    return (
        <div className="history-card">
        <h4>Q: {data.question}</h4>
        <p>A: {data.answer}</p>
        <small className="date-time">
            🗓️ {new Date(data.createdAt).toLocaleString()}
        </small>
        <a href={data.source} target="_blank" rel="noopener noreferrer">🔗 Source</a>
        </div>
    );
}
