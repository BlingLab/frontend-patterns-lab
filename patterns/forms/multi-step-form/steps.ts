export const steps = ['account', 'profile', 'confirm'] as const;
export type Step = typeof steps[number];
