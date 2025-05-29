export const sanitizeInput = (input: string) => {
  return input.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
};