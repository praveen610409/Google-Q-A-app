import React from 'react';

export default function HistoryCard({ data }) {
    return (
    <div className="card">
        <h4>Q: {data.question}</h4>
        <p>A: {data.answer}</p>
        <small>🗓️ {new Date(data.createdAt).toLocaleString()}</small>
        <a href={data.source} target="_blank" rel="noopener noreferrer">🔗 Source</a>
        </div>
    );
}
