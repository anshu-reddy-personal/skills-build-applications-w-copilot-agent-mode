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

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // VITE_CODESPACE_NAME must be defined (for example in `.env.local`).
  // Fallback avoids https://undefined-8000.app.github.dev URLs.
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

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
          setUsers(normalizeList(payload))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load users')
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
          <h2 className="h3 mb-1">Users</h2>
          <p className="text-muted mb-0 small">Source: {apiUrl}</p>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading users…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id || user.email}>
                    <td>{user.name || '—'}</td>
                    <td>{user.email || '—'}</td>
                    <td>{user.age ?? '—'}</td>
                    <td>{user.team || '—'}</td>
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

export default Users
