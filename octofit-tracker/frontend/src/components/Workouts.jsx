import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchResource } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadWorkouts() {
      setLoading(true)
      setError('')
      try {
        const data = await fetchResource('workouts/')
        if (!cancelled) {
          setWorkouts(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load workouts')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="page-section">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="h3 mb-1">Workouts</h2>
          <p className="text-muted mb-0 small">
            Source: {API_BASE_URL}/api/workouts/
          </p>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading workouts…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Exercises</th>
                <th scope="col">Suggested For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No workouts found.
                  </td>
                </tr>
              ) : (
                workouts.map((workout) => (
                  <tr key={workout._id || workout.name}>
                    <td>
                      <div className="fw-semibold">{workout.name || '—'}</div>
                      {workout.description ? (
                        <div className="small text-muted">{workout.description}</div>
                      ) : null}
                    </td>
                    <td className="text-capitalize">{workout.difficulty || '—'}</td>
                    <td>{workout.durationMinutes ?? '—'}</td>
                    <td>
                      {Array.isArray(workout.exercises) && workout.exercises.length > 0
                        ? workout.exercises.join(', ')
                        : '—'}
                    </td>
                    <td>
                      {Array.isArray(workout.suggestedFor) && workout.suggestedFor.length > 0
                        ? workout.suggestedFor.join(', ')
                        : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
