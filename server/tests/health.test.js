import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('GET /api/health', () => {
  const app = createApp();

  it('should return 200 OK with healthy status payload', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.data.version).toBe('1.0.0');
    expect(res.body.data.activeServices).toContain('STUDENT_OPPORTUNITIES');
    expect(res.body.data.activeServices).toContain('GOVERNMENT_SCHEMES');
  });
});
