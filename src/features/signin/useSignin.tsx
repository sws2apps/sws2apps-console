import { useCallback, useEffect, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { authSignInPopup, setAuthPersistence } from '@services/firebase/auth';
import { apiAuthorizeUser, apiLoginUser } from '@services/api/auth';
import { isUserConnectedState, isUserVerifyMFAState } from '@states/app';
import { showNotification } from '@services/app/notification';
import useFirebase from '@features/hooks/useFirebase';

const provider = new GoogleAuthProvider();

const useSignin = () => {
  const { isAuthenticated } = useFirebase();

  const setUserVerifyMFA = useSetAtom(isUserVerifyMFAState);
  const setUserConnected = useSetAtom(isUserConnectedState);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthorization = useCallback(async () => {
    try {
      if (!isAuthenticated) return;

      setIsProcessing(true);

      const logged = await apiAuthorizeUser();

      if (logged.message === 'OK') {
        setIsProcessing(false);
        setUserConnected(true);
        return;
      }

      const data = await apiLoginUser();

      if (data.message === 'MFA_VERIFY') {
        setIsProcessing(false);
        setUserVerifyMFA(true);
        return;
      }

      await apiAuthorizeUser();
      setUserConnected(true);

      setIsProcessing(false);
    } catch (error) {
      console.error(error);

      setIsProcessing(false);

      showNotification((error as Error).message, 'error');
    }
  }, [isAuthenticated, setUserVerifyMFA, setUserConnected]);

  const handleSignin = async () => {
    if (isProcessing) return;

    try {
      await setAuthPersistence();
      await authSignInPopup(provider);
    } catch (error) {
      console.error(error);

      setIsProcessing(false);

      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    handleAuthorization();
  }, [handleAuthorization]);

  return { handleSignin, isProcessing };
};

export default useSignin;
