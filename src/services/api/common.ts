import { authCurrentUser } from '@services/firebase/auth';
import { apiHostState, store } from '@states/app';

export const apiDefault = async () => {
  const apiHost = store.get(apiHostState);

  const appversion = import.meta.env.PACKAGE_VERSION;
  const userUID = authCurrentUser()?.uid;
  const idToken = await authCurrentUser()?.getIdToken();

  return { userUID, idToken, appversion, apiHost };
};
