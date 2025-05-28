import api from './api';
import { Item, CreateItemDto } from '../types/item';

export const fetchItems = async (): Promise<Item[]> => {
  const response = await api.get('/items');
  return response.data;
};

export const createItem = async (item: CreateItemDto): Promise<Item> => {
  const response = await api.post('/items', item);
  return response.data;
};

export const updateItemStatus = async (id: string, status: 'CLAIMED'): Promise<Item> => {
  const response = await api.patch(`/items/${id}`, { status });
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};