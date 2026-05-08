import { useState } from 'react';

export function useUserForm() {
  const [name, setName] = useState('');
  return { name, setName, canSubmit: name.trim().length > 1 };
}
