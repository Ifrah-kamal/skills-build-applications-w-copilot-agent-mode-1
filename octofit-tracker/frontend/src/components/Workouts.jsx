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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        const payload = await response.json();
        setWorkouts(getData(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section className="card shadow-sm border-0 p-4">
      <h2 className="h4 fw-semibold">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group list-group-flush mt-3">
        {workouts.map((workout) => (
          <li className="list-group-item px-0" key={workout._id || workout.name}>
            <strong>{workout.name}</strong> — {workout.focus} ({workout.durationMinutes} min)
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
