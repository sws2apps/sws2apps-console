import { APIFeatureFlag } from '@definition/api';
import { apiDefault } from './common';

export const apiFlagsGet = async () => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/flags`, {
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

    return data as APIFeatureFlag[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiFlagsCreate = async ({
  desc,
  name,
  availability,
}: {
  name: string;
  desc: string;
  availability: APIFeatureFlag['availability'];
}) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/flags`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ desc, name, availability }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIFeatureFlag[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiFlagDelete = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/flags/${id}`, {
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

    return data as APIFeatureFlag[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiFlagUpdate = async ({
  coverage,
  description,
  id,
  name,
}: {
  id: string;
  name: string;
  description: string;
  coverage: number;
}) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/flags/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        appclient: 'admin',
        appversion,
      },
      body: JSON.stringify({ coverage, description, name }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIFeatureFlag[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiFlagToggle = async (id: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(`${apiHost}api/v3/admin/flags/${id}/toggle`, {
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

    return data as APIFeatureFlag[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiUserFlagToggle = async (userId: string, flagid: string) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(
      `${apiHost}api/v3/admin/users/${userId}/feature-flags`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
          appclient: 'admin',
          appversion,
        },
        body: JSON.stringify({ flagid }),
      }
    );

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIFeatureFlag[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const apiCongregationFlagToggle = async (
  congId: string,
  flagid: string
) => {
  try {
    const { apiHost, appversion, idToken } = await apiDefault();

    const res = await fetch(
      `${apiHost}api/v3/admin/congregations/${congId}/feature-flags`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
          appclient: 'admin',
          appversion,
        },
        body: JSON.stringify({ flagid }),
      }
    );

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data?.message);
    }

    return data as APIFeatureFlag[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
