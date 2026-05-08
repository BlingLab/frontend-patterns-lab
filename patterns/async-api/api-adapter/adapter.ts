import type { ApiUser, UserViewModel } from './types';

export function adaptUser(user: ApiUser): UserViewModel {
  return { id: String(user.id), name: user.profile.name, email: user.email_address };
}
