import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchResource } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadActivities() {
      setLoading(true)
      setError('')
      try {
        const data = await fetchResource('activities')
        if (!cancelled) {
          setActivities(data)
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

    loadActivities()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="page-section">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="h3 mb-1">Activities</h2>
          <p className="text-muted mb-0 small">
            Source: {API_BASE_URL}/api/activities
          </p>
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
