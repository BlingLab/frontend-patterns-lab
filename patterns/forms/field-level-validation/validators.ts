export function validateEmail(value: string) { return /.+@.+\..+/.test(value) ? null : '올바른 이메일을 입력하세요.'; }
