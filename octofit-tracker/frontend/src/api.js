/**
 * API base URL configuration.
 *
 * VITE_CODESPACE_NAME must be defined (for example in `.env.local`) when running
 * against a GitHub Codespaces backend. Example:
 *
 *   VITE_CODESPACE_NAME=your-codespace-name
 *
 * Without it, the client falls back to http://localhost:8000 to avoid
 * generating invalid URLs like https://undefined-8000.app.github.dev.
 */

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

/**
 * Normalize API payloads that may be a bare array or a paginated object
 * (results / data / items).
 */
export function normalizeList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results;
    }
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    if (Array.isArray(payload.items)) {
      return payload.items;
    }
  }
  return [];
}

export async function fetchResource(path) {
  const url = `${API_BASE_URL}/api/${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  const payload = await response.json();
  return normalizeList(payload);
}
