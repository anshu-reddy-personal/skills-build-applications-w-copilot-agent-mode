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

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // VITE_CODESPACE_NAME must be defined (for example in `.env.local`).
  // Fallback avoids https://undefined-8000.app.github.dev URLs.
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

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
          setEntries(normalizeList(payload))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
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
          <h2 className="h3 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0 small">Source: {apiUrl}</p>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
                <th scope="col">Period</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No leaderboard entries found.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id || `${entry.points}-${index}`}>
                    <td>{entry.rank ?? index + 1}</td>
                    <td>
                      {typeof entry.user === 'object' && entry.user
                        ? entry.user.name || entry.user.email
                        : entry.user || '—'}
                    </td>
                    <td>
                      {typeof entry.team === 'object' && entry.team
                        ? entry.team.name
                        : entry.team || '—'}
                    </td>
                    <td>{entry.points ?? 0}</td>
                    <td className="text-capitalize">{entry.period || '—'}</td>
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

export default Leaderboard
