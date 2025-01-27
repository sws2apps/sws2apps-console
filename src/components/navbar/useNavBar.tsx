import { useAtom, useAtomValue } from 'jotai';
import { isUserConnectedState, isUserVerifyMFAState } from '@states/app';
import { authSignOut } from '@services/firebase/auth';
import { showNotification } from '@services/app/notification';
import { apiSignOutUser } from '@services/api/auth';

const useNavBar = () => {
  const [isUserConnected, setIsUserConnected] = useAtom(isUserConnectedState);

  const isVerifyMFA = useAtomValue(isUserVerifyMFAState);

  const handleSignOut = async () => {
    try {
      await apiSignOutUser();
      await authSignOut();

      setIsUserConnected(false);
    } catch (error) {
      console.error(error);

      showNotification((error as Error).message, 'error');
    }
  };

  return { isUserConnected, isVerifyMFA, handleSignOut };
};

export default useNavBar;
