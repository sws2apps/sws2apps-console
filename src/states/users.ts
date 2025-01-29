import { atom } from 'jotai';
import { APIUser } from '@definition/api';

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
