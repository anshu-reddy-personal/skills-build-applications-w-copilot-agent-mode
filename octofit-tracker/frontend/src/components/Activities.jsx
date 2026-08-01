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

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // VITE_CODESPACE_NAME must be defined (for example in `.env.local`).
  // Fallback avoids https://undefined-8000.app.github.dev URLs.
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

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
          setActivities(normalizeList(payload))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load activities')
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
          <h2 className="h3 mb-1">Activities</h2>
          <p className="text-muted mb-0 small">Source: {apiUrl}</p>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading activities…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Distance (km)</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id || `${activity.type}-${activity.date}`}>
                    <td>
                      {typeof activity.user === 'object' && activity.user
                        ? activity.user.name || activity.user.email
                        : activity.user || '—'}
                    </td>
                    <td className="text-capitalize">{activity.type || '—'}</td>
                    <td>{activity.durationMinutes ?? '—'}</td>
                    <td>{activity.distanceKm ?? '—'}</td>
                    <td>{activity.caloriesBurned ?? '—'}</td>
                    <td>
                      {activity.date
                        ? new Date(activity.date).toLocaleDateString()
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

export default Activities
