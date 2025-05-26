export interface User {
  id: string;
  username: string;
  role: 'USER' | 'STAFF' | 'ADMIN';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}