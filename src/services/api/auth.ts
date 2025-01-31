import { APIUserResponseType } from '@definition/api';
import { apiDefault } from './common';

export const apiLoginUser = async () => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/user-login`, {
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

    return data as APIUserResponseType;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiAuthorizeUser = async () => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin`, {
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

    if (res.status === 403) {
      throw new Error('UNAUTHORIZED_ACCESS');
    }

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUserResponseType;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiVerifyOTP = async (userOTP: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/mfa/verify-token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ token: userOTP }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIUserResponseType;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiSignOutUser = async () => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/logout`, {
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

    return data as APIUserResponseType;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
