import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('Student Opportunities API', () => {
  const app = createApp();

  it('should accept valid search request and return 202 Accepted with jobId', async () => {
    const payload = {
      category: 'INTERNSHIP',
      skills: ['Node.js', 'React'],
      academicYear: 3,
      location: 'Bengaluru',
      isRemote: false
    };

    const res = await request(app)
      .post('/api/student/search')
      .send(payload);

    expect(res.status).toBe(202);
    expect(res.body.success).toBe(true);
    expect(res.body.data.jobId).toBeDefined();
    expect(res.body.data.isDevelopmentMode).toBe(true);

    const jobId = res.body.data.jobId;

    // Verify polling endpoint
    const pollRes = await request(app).get(`/api/student/search/${jobId}`);
    expect(pollRes.status).toBe(200);
    expect(pollRes.body.success).toBe(true);
    expect(Array.isArray(pollRes.body.data.opportunities)).toBe(true);
    expect(pollRes.body.data.opportunities.length).toBeGreaterThan(0);
  });

  it('should reject invalid payload with 400 Bad Request', async () => {
    const invalidPayload = {
      category: 'INVALID_CATEGORY_NAME'
    };

    const res = await request(app)
      .post('/api/student/search')
      .send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_FAILED');
  });
});
