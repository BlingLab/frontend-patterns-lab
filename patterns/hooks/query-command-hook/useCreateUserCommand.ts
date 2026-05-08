export function useCreateUserCommand() {
  return { execute: async (name: string) => ({ id: crypto.randomUUID(), name }), isPending: false };
}
