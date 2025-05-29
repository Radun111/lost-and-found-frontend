import { rest } from 'msw';

export const handlers = [
  rest.get('/api/items', (req, res, ctx) => {
    return res(
      ctx.json({ 
        items: [{ id: '1', title: 'Test Item' }],
        total: 1 
      })
    );
  })
];