import type { ApiUser, UserViewModel } from './types';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function adaptUser(user: ApiUser): UserViewModel {
  const blocked = user.flags.is_blocked;
  const verified = user.flags.email_verified;

  return {
    id: String(user.id),
    displayName: user.profile.name,
    email: user.email_address,
    department: user.profile.department_name,
    statusLabel: blocked ? '차단됨' : verified ? '활성' : '이메일 확인 필요',
    statusTone: blocked ? 'red' : verified ? 'green' : 'yellow',
    joinedAtLabel: dateFormatter.format(new Date(user.created_at)),
  };
}

export function adaptUsers(users: ApiUser[]): UserViewModel[] {
  return users.map(adaptUser);
}
