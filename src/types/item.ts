export interface Item {
  id: string;
  title: string;
  description: string;
  status: 'LOST' | 'FOUND' | 'CLAIMED';
}

export interface CreateItemDto {
  title: string;
  description: string;
  status: 'LOST' | 'FOUND';
}