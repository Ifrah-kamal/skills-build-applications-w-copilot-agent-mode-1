import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Track fitness, build teams, and compete with purpose.</h1>
          <p className="lead text-muted mt-3">
            A modern multi-tier fitness platform for activity logging, team challenges,
            and personalized workout insights.
          </p>
          <div className="d-flex gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="/">Get Started</a>
            <a className="btn btn-outline-secondary btn-lg" href="/">View Demo</a>
          </div>
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
    </main>
  )
}

export default App
