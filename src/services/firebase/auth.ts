import {
  AuthProvider,
  getAuth,
  indexedDBLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const setAuthPersistence = async () => {
  const auth = getAuth();
  await setPersistence(auth, indexedDBLocalPersistence);
};

export const authSignInPopup = async (provider: AuthProvider) => {
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);

  return result?.user;
};

export const authCurrentUser = () => {
  const auth = getAuth();
  const user = auth?.currentUser;
  return user;
};

export const authSignOut = async () => {
  const auth = await getAuth();
  if (auth) {
    await signOut(auth);
  }
};
