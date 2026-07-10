import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

const getData = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }
  return [];
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const payload = await response.json();
        setEntries(getData(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm border-0 p-4">
      <h2 className="h4 fw-semibold">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ol className="mt-3">
        {entries.map((entry) => (
          <li key={entry._id || entry.rank}>
            <strong>{entry.username}</strong> — {entry.score} pts
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
