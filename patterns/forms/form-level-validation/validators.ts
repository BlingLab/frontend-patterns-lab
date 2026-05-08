export function validatePasswordPair(password: string, confirmPassword: string) { return password === confirmPassword ? null : '비밀번호가 일치하지 않습니다.'; }
