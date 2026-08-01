# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit Tracker multi-tier application.

## Stack

- React 19
- Vite
- react-router-dom
- Bootstrap 5

## Environment variables

`VITE_CODESPACE_NAME` **must be defined** when the frontend talks to a backend running in GitHub Codespaces.

Create `octofit-tracker/frontend/.env.local`:

```bash
cp octofit-tracker/frontend/.env.example octofit-tracker/frontend/.env.local
```

Then set:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs with Vite env access:

```js
import.meta.env.VITE_CODESPACE_NAME
```

Resolved endpoint pattern:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]
```

Examples:

- `.../api/activities`
- `.../api/leaderboard`
- `.../api/teams`
- `.../api/users`
- `.../api/workouts`

### Safe fallback

If `VITE_CODESPACE_NAME` is unset/empty, the client uses:

```text
http://localhost:8000
```

This avoids invalid URLs such as `https://undefined-8000.app.github.dev`.

Restart the Vite dev server after changing `.env.local`.

## Develop

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

The UI is served on port `5173`.

## Routes

| Path | Component |
|------|-----------|
| `/` | Home |
| `/activities` | Activities |
| `/leaderboard` | Leaderboard |
| `/teams` | Teams |
| `/users` | Users |
| `/workouts` | Workouts |

Components accept either a bare JSON array or common paginated shapes (`results`, `data`, or `items`).
