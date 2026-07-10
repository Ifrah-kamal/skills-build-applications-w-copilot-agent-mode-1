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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const payload = await response.json();
        setActivities(getData(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="card shadow-sm border-0 p-4">
      <h2 className="h4 fw-semibold">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group list-group-flush mt-3">
        {activities.map((activity) => (
          <li className="list-group-item px-0" key={activity._id || activity.date}>
            <strong>{activity.type}</strong> — {activity.durationMinutes} min, {activity.caloriesBurned} kcal
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
