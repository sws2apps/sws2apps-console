import { APICongregation, APICongregationPerson } from '@definition/api';
import { apiDefault } from './common';

export const apiCongregationsGet = async () => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/congregations`, {
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

    return data as APICongregation[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiCongregationPersonsGet = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(
      `${apiHost}api/v3/admin/congregations/${id}/persons`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
          appclient: 'admin',
          appversion,
        },
      }
    );

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APICongregationPerson[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiCongregationDelete = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/congregations/${id}`, {
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

    return data as APICongregation[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
