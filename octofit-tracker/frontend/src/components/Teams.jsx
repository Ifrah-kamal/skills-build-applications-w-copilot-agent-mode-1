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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const payload = await response.json();
        setTeams(getData(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="card shadow-sm border-0 p-4">
      <h2 className="h4 fw-semibold">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group list-group-flush mt-3">
        {teams.map((team) => (
          <li className="list-group-item px-0" key={team._id || team.name}>
            <strong>{team.name}</strong> — {team.sport}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
