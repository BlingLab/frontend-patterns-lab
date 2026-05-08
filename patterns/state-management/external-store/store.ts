type Listener = () => void;
let value = 0;
const listeners = new Set<Listener>();

export const counterStore = {
  getSnapshot: () => value,
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  increment() {
    value += 1;
    listeners.forEach((listener) => listener());
  },
};
