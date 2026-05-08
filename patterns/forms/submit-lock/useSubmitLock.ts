import { useCallback, useState } from 'react';
export function useSubmitLock() { const [isSubmitting, setSubmitting] = useState(false); const run = useCallback(async (task: () => Promise<void>) => { if (isSubmitting) return; setSubmitting(true); try { await task(); } finally { setSubmitting(false); } }, [isSubmitting]); return { isSubmitting, run }; }
