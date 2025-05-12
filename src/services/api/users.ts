import { APIUser } from '@definition/api';
import { apiDefault } from './common';
import { CongRole } from '@definition/congregation';

export const apiUsersGet = async () => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUser[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiUserDelete = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/users/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUser[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiUserDisableMFA = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/users/${id}/disable-2fa`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUser[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiUserUpdate = async ({
  email,
  firstname,
  id,
  lastname,
  roles,
}: {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  roles: CongRole[];
}) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/users/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ email, firstname, lastname, roles }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUser[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiUserDeleteSession = async (id: string, identifier: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/users/${id}/sessions`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ identifiers: [identifier] }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUser[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiUserDeleteSessions = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/users/${id}/sessions`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ identifiers: [] }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUser[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiUserAssignCongregation = async (
  id: string,
  congregation: string
) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/users/${id}/congregation`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ congregation }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUser[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
