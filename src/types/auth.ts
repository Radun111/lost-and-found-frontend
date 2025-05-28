export interface User {
  id: string;
  username: string;
  role: 'student' | 'staff' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    username: string;
    password: string;
    role: string;
  }) => Promise<void>;
}