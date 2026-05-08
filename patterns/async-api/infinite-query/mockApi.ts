import { users } from '../../../shared/mocks/users';
export async function fetchUserCursor(cursor = 0) { return { items: users.slice(cursor, cursor + 3), nextCursor: cursor + 3 < users.length ? cursor + 3 : null }; }
