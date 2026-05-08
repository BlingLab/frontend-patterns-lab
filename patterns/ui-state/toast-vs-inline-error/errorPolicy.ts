export type ErrorSurface = 'toast' | 'inline';
export function chooseErrorSurface(recoverable: boolean): ErrorSurface { return recoverable ? 'inline' : 'toast'; }
