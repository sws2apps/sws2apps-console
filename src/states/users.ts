import { atom } from 'jotai';
import { APIUser } from '@definition/api';
import { UserByRole } from '@definition/user';

export const userBusyState = atom(false);

export const userSearchState = atom('');

export const usersState = atom<APIUser[]>([]);

export const usersFilteredState = atom((get) => {
  const users = get(usersState);
  const search = get(userSearchState);

  const filtered = users.filter((record) => {
    const key = search.toLowerCase();

    if (record.profile.email?.toLowerCase().includes(key)) return true;
    if (record.profile.firstname.value.toString().toLowerCase().includes(key))
      return true;
    if (record.profile.lastname.value.toLowerCase().includes(key)) return true;

    return false;
  });

  return filtered.sort((a, b) =>
    a.profile.lastname.value.localeCompare(b.profile.lastname.value)
  );
});

export const usersCount = atom((get) => {
  const users = get(usersFilteredState);
  return users.length;
});

export const usersByRoleState = atom((get) => {
  const users = get(usersFilteredState);

  const result = users.reduce((acc: UserByRole[], current) => {
    const role = acc.find(
      (record) => record.global_role === current.profile.global_role
    );

    if (role) {
      role.users.push(current);

      role.users.sort((a, b) =>
        a.profile.lastname.value.localeCompare(b.profile.lastname.value)
      );
    }

    if (!role) {
      acc.push({
        global_role: current.profile.global_role,
        role_name: 
        users: [current],
      });
    }

    return acc;
  }, []);

  const order = ['admin', 'vip', 'pocket'];

  return result.sort((a, b) => {
    const value1 = a.global_role;
    const value2 = b.global_role;

    return order.indexOf(value1) - order.indexOf(value2);
  });
});
