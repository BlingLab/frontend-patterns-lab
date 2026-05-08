import { users } from '../../../shared/mocks/users';

export function useUsersQuery() {
  return { data: users, isLoading: false, error: null };
}
