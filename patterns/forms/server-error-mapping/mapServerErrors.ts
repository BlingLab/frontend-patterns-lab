export function mapServerErrors(errors: Record<string, string>) { return { fieldErrors: errors, formError: errors._form ?? null }; }
