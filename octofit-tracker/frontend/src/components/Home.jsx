import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../api'

function Home() {
  return (
    <section className="page-section text-start">
      <div className="p-4 p-md-5 mb-4 bg-primary-subtle border rounded-3">
        <h1 className="display-6 fw-semibold text-body-emphasis">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-3">
          Track activities, manage teams, climb the leaderboard, and get personalized workout
          suggestions for Mergington High School.
        </p>
        <p className="mb-4 text-muted">
          API base URL: <code>{API_BASE_URL}</code>
        </p>
        <div className="d-flex flex-wrap gap-2">
          <Link className="btn btn-primary" to="/activities">
            View Activities
          </Link>
          <Link className="btn btn-outline-primary" to="/leaderboard">
            Leaderboard
          </Link>
          <Link className="btn btn-outline-secondary" to="/workouts">
            Workouts
          </Link>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">Users &amp; Teams</h2>
              <p className="card-text">Browse student profiles and team rosters.</p>
              <Link to="/users" className="card-link">
                Users
              </Link>
              <Link to="/teams" className="card-link">
                Teams
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">Activity Logging</h2>
              <p className="card-text">Review runs, rides, strength sessions, and more.</p>
              <Link to="/activities" className="card-link">
                Activities
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h2 className="h5 card-title">Competition</h2>
              <p className="card-text">See who is leading and which workouts to try next.</p>
              <Link to="/leaderboard" className="card-link">
                Leaderboard
              </Link>
              <Link to="/workouts" className="card-link">
                Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
