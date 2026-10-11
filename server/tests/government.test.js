import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('Government Schemes API', () => {
  const app = createApp();

  it('should accept valid scheme search and return 202 Accepted with jobId', async () => {
    const payload = {
      educationLevel: 'UNDERGRADUATE',
      state: 'Karnataka',
      category: 'MERIT'
    };

    const res = await request(app)
      .post('/api/government/search')
      .send(payload);

    expect(res.status).toBe(202);
    expect(res.body.success).toBe(true);
    expect(res.body.data.jobId).toBeDefined();

    const jobId = res.body.data.jobId;

    const pollRes = await request(app).get(`/api/government/search/${jobId}`);
    expect(pollRes.status).toBe(200);
    expect(pollRes.body.success).toBe(true);
    expect(Array.isArray(pollRes.body.data.schemes)).toBe(true);
    expect(pollRes.body.data.schemes.length).toBeGreaterThan(0);
  });

  it('should reject invalid education level with 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/government/search')
      .send({ educationLevel: 'KINDERGARTEN' });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_FAILED');
  });
});
