import { delay } from '../utils/delay';
import { users } from './users';
export async function fetchUsers() { await delay(300); return users; }
