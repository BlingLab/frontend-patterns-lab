export type ServerValidationError = {
  code: 'VALIDATION_FAILED';
  message: string;
  errors: Array<{
    field?: string;
    message: string;
  }>;
};

export type FormErrorMap = {
  fieldErrors: Record<string, string>;
  formError: string | null;
};

export function mapServerErrors(error: ServerValidationError): FormErrorMap {
  return error.errors.reduce<FormErrorMap>(
    (result, item) => {
      if (item.field) {
        return {
          ...result,
          fieldErrors: { ...result.fieldErrors, [item.field]: item.message },
        };
      }

      return {
        ...result,
        formError: item.message,
      };
    },
    { fieldErrors: {}, formError: error.message },
  );
}
