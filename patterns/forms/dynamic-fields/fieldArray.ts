export type FieldItem = { id: string; label: string };
export const createFieldItem = (label = ''): FieldItem => ({ id: crypto.randomUUID(), label });
