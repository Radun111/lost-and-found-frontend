// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { Item } from '../types/item';
import { User } from '../types/auth';

// Define mock data interfaces that match your actual API responses
interface MockItem extends Omit<Item, 'userId'> {
  // Remove any properties not in your Item type
  // Add any additional properties your API returns
}

interface MockRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  item: MockItem;
  user: Pick<User, 'id' | 'username'>;
}

const mockItems: MockItem[] = [
  {
    id: '1',
    title: 'Test Item',
    description: 'Test description',
    status: 'LOST'
    // Only include properties that exist in your Item interface
  }
];

const mockRequests: MockRequest[] = [
  {
    id: '1',
    status: 'PENDING',
    item: mockItems[0],
    user: {
      id: '1',
      username: 'testuser'
    }
  }
];

export const handlers = [
  http.post('/auth/login', () => {
    return HttpResponse.json({
      token: 'mock-token',
      user: {
        id: '1',
        username: 'testuser',
        role: 'student'
      }
    });
  }),

  http.get('/items', () => {
    return HttpResponse.json(mockItems);
  }),

  http.get('/requests', () => {
    return HttpResponse.json(mockRequests);
  }),

  http.get('/auth/me', () => {
    return HttpResponse.json({
      id: '1',
      username: 'testuser',
      role: 'student'
    });
  })
];