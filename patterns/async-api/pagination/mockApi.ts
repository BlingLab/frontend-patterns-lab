import { users } from '../../../shared/mocks/users';
export async function fetchUsersPage(page: number, pageSize = 5) { return users.slice((page - 1) * pageSize, page * pageSize); }
