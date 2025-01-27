import { APICountry } from '@definition/api';
import { apiDefault } from './common';

export const apiCountriesGet = async () => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/congregations/countries`, {
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

    return data as APICountry[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
