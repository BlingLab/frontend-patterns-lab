export type CounterAction = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' };

export function counterReducer(count: number, action: CounterAction) {
  switch (action.type) {
    case 'increment': return count + 1;
    case 'decrement': return count - 1;
    case 'reset': return 0;
    default: return count;
  }
}
