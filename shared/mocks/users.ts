export const users = Array.from({ length: 12 }, (_, index) => ({ id: String(index + 1), name: `User ${index + 1}`, email: `user${index + 1}@example.com` }));
