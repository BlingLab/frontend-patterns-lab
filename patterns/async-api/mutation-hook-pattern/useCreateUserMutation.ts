export function useCreateUserMutation() {
  return { mutate: async (name: string) => ({ id: crypto.randomUUID(), name }), isPending: false };
}
