import { apiDefault } from './common';

export const apiClientVersionGet = async () => {
  try {
    const { apiHost, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/client-version`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
      },
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data.version as string;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiClientVersionSet = async (version: string) => {
  try {
    const { apiHost, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/client-version`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
      },
      body: JSON.stringify({ version }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data.version as string;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
