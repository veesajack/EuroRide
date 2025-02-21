import { rest } from 'msw';

export const handlers = [
  // Auth handlers
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        }
      })
    );
  }),

  // Rides handlers
  rest.get('/api/rides', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          title: 'Morning Ride',
          distance: 10.5,
          duration: 3600,
          date: new Date().toISOString()
        }
      ])
    );
  }),

  // Add more handlers as needed
];
