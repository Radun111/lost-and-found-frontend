// src/types/request.ts
export interface Request {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  item: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}