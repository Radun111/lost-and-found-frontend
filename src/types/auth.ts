export interface User {
  id: string;
  username: string;
  role: 'USER' | 'STAFF' | 'ADMIN';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface LoginResponse {
  token: string;
  user: User;
}