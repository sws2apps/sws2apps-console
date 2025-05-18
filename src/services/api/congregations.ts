import { APICongregation, APICongregationDetails } from '@definition/api';
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

export const apiCongregationGet = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/congregations/${id}`, {
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

    return data as APICongregationDetails;
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

export const apiCongregationToggleDataSync = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(
      `${apiHost}api/v3/admin/congregations/${id}/data-sync`,
      {
        method: 'PATCH',
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

    return data as APICongregationDetails;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiCongregationCreate = async (
  country: string,
  name: string,
  number: string
) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/congregations`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ country, name, number }),
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

export const apiCongregationDeleteRequest = async (
  id: string,
  request_id: string
) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(
      `${apiHost}api/v3/admin/congregations/${id}/requests/${request_id}`,
      {
        method: 'DELETE',
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

    return data as APICongregationDetails;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiCongregationResetSpeakersKey = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(
      `${apiHost}api/v3/admin/congregations/${id}/speakers-key`,
      {
        method: 'DELETE',
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

    return data as APICongregationDetails;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
