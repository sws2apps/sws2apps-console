import { authCurrentUser } from '@services/firebase/auth';
import { apiHostState, store } from '@states/app';

export const apiDefault = async () => {
  const apiHost = store.get(apiHostState);

  const userUID = authCurrentUser()?.uid;
  const idToken = await authCurrentUser()?.getIdToken();

  return { userUID, idToken, apiHost };
};
