import { useEffect, useState } from 'react'

function normalizeList(payload) {
  if (Array.isArray(payload)) {
    return payload
  }
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results
    }
    if (Array.isArray(payload.data)) {
      return payload.data
    }
    if (Array.isArray(payload.items)) {
      return payload.items
    }
  }
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // VITE_CODESPACE_NAME must be defined (for example in `.env.local`).
  // Fallback avoids https://undefined-8000.app.github.dev URLs.
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`Request failed (${response.status}) for ${apiUrl}`)
        }
        const payload = await response.json()
        if (!cancelled) {
          setWorkouts(normalizeList(payload))
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

    load()
    return () => {
      cancelled = true
    }
  }, [apiUrl])

  return (
    <section className="page-section">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="h3 mb-1">Workouts</h2>
          <p className="text-muted mb-0 small">Source: {apiUrl}</p>
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
