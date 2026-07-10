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

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const payload = await response.json();
        setUsers(getData(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="card shadow-sm border-0 p-4">
      <h2 className="h4 fw-semibold">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group list-group-flush mt-3">
        {users.map((user) => (
          <li className="list-group-item px-0" key={user._id || user.email}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
