import { useEffect, useState } from 'react';

export function useAsync<T>(factory: () => Promise<T>, deps: React.DependencyList) {
  const [state, setState] = useState<{ loading: boolean; data?: T; error?: Error }>({ loading: true });
  useEffect(() => {
    let active = true;
    setState({ loading: true });
    factory().then((data) => active && setState({ loading: false, data }), (error) => active && setState({ loading: false, error }));
    return () => { active = false; };
  }, deps);
  return state;
}
