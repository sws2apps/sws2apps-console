import { getAuth } from 'firebase/auth';
import { getProfile } from './common';

export const apiFetchUsers = async (id) => {
  const { apiHost, visitorID } = await getProfile();

  try {
    if (apiHost !== '') {
      const auth = await getAuth();
      const user = auth.currentUser;

      const res = await fetch(`${apiHost}api/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          visitorid: visitorID,
          uid: user.uid,
        },
      });
      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const apiUserTokenRevoke = async (id) => {
  const { apiHost, visitorID } = await getProfile();

  try {
    if (apiHost !== '') {
      const auth = await getAuth();
      const user = auth.currentUser;

      const res = await fetch(`${apiHost}api/admin/users/${id}/revoke-token`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          visitorid: visitorID,
          uid: user.uid,
        },
      });
      const data = await res.json();

      return { status: res.status, data };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const apiUserDelete = async (id) => {
  const { apiHost, visitorID } = await getProfile();

  try {
    if (apiHost !== '') {
      const auth = await getAuth();
      const user = auth.currentUser;

      const res = await fetch(`${apiHost}api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          visitorid: visitorID,
          uid: user.uid,
        },
      });
      const data = await res.json();

      return { status: res.status, data };
    }
  } catch (err) {
    throw new Error(err);
  }
};
