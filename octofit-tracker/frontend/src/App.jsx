import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <section className="row align-items-center g-4">
      <div className="col-lg-7">
        <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
        <h1 className="display-4 fw-bold">Track fitness, build teams, and compete with purpose.</h1>
        <p className="lead text-muted mt-3">
          A modern multi-tier fitness platform for activity logging, team challenges,
          and personalized workout insights.
        </p>
        <p className="mt-3 text-muted">
          Define VITE_CODESPACE_NAME in .env.local to use Codespaces URLs for the backend API.
        </p>
      </div>
      <div className="col-lg-5">
        <div className="card shadow-sm border-0 p-4">
          <h2 className="h4 fw-semibold">Why OctoFit?</h2>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item px-0">Activity logging and streak tracking</li>
            <li className="list-group-item px-0">Team-based challenges and leaderboards</li>
            <li className="list-group-item px-0">Personalized workout suggestions</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm px-3 mb-4">
        <span className="navbar-brand fw-semibold">OctoFit Tracker</span>
        <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
