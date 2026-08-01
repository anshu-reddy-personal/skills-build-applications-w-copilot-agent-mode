import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchResource } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadTeams() {
      setLoading(true)
      setError('')
      try {
        const data = await fetchResource('teams/')
        if (!cancelled) {
          setTeams(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load teams')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadTeams()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="page-section">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="h3 mb-1">Teams</h2>
          <p className="text-muted mb-0 small">
            Source: {API_BASE_URL}/api/teams/
          </p>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading teams…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted">
                    No teams found.
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team._id || team.name}>
                    <td>{team.name || '—'}</td>
                    <td>{team.description || '—'}</td>
                    <td>
                      {Array.isArray(team.members)
                        ? team.members
                            .map((member) =>
                              typeof member === 'object' && member
                                ? member.name || member.email
                                : member
                            )
                            .filter(Boolean)
                            .join(', ') || '—'
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

export default Teams
