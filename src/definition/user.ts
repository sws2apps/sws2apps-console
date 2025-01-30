import { APIUser } from './api';

export type GlobalRole = 'admin' | 'vip' | 'pocket';

export type UserByRole = {
  global_role: string;
  users: APIUser[];
};
