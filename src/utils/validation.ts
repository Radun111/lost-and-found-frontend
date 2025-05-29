// Validation utility functions
export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateItem = (item: { title: string }): string | null => {
  if (!item.title) return "Item title is required";
  if (item.title.length < 3) return "Title too short";
  return null;
};