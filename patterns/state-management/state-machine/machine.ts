export type AsyncState = 'idle' | 'loading' | 'success' | 'error';

export const transitions: Record<AsyncState, AsyncState[]> = {
  idle: ['loading'],
  loading: ['success', 'error'],
  success: ['loading'],
  error: ['loading'],
};
