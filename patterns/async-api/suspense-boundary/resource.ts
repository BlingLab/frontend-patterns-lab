export function createResource<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;
  const suspender = promise.then((value) => { status = 'success'; result = value; }, (reason) => { status = 'error'; error = reason; });
  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      return result;
    },
  };
}
