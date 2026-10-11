/**
 * NextStep AI API Client Service
 */

const BASE_URL = '/api';

async function fetchJson(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data?.error?.message || `HTTP ${res.status}: Failed to fetch`;
      const error = new Error(errorMsg);
      error.status = res.status;
      error.details = data?.error?.details || null;
      error.code = data?.error?.code || 'FETCH_ERROR';
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Network error: Unable to communicate with NextStep AI server. Is the backend running on port 5000?');
    }
    throw err;
  }
}

export const api = {
  // Health
  getHealth: () => fetchJson('/health'),

  // Jobs
  getJobStatus: (jobId) => fetchJson(`/jobs/${jobId}`),

  // Student Service
  searchOpportunities: (filters) =>
    fetchJson('/student/search', {
      method: 'POST',
      body: JSON.stringify(filters)
    }),

  getStudentResults: (jobId) => fetchJson(`/student/search/${jobId}`),

  getOpportunityById: (id) => fetchJson(`/student/opportunities/${id}`),

  saveOpportunity: (opportunityId, opportunitySnapshot) =>
    fetchJson('/student/saved', {
      method: 'POST',
      body: JSON.stringify({ opportunityId, opportunitySnapshot })
    }),

  getSavedOpportunities: () => fetchJson('/student/saved'),

  // Government Service
  searchSchemes: (filters) =>
    fetchJson('/government/search', {
      method: 'POST',
      body: JSON.stringify(filters)
    }),

  getGovernmentResults: (jobId) => fetchJson(`/government/search/${jobId}`),

  getSchemeById: (id) => fetchJson(`/government/schemes/${id}`),

  saveScheme: (schemeId, schemeSnapshot) =>
    fetchJson('/government/saved', {
      method: 'POST',
      body: JSON.stringify({ schemeId, schemeSnapshot })
    }),

  getSavedSchemes: () => fetchJson('/government/saved')
};
