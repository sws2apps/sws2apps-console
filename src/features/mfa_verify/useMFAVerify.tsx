import { useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { apiVerifyOTP } from '@services/api/auth';
import { isUserConnectedState } from '@states/app';
import { showNotification } from '@services/app/notification';

const useMFAVerify = () => {
  const otpRef = useRef<HTMLInputElement>(undefined);

  const setUserConnected = useSetAtom(isUserConnectedState);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerifyOTP = async () => {
    if (isProcessing) return;

    const token = otpRef.current?.value || '';

    if (token.length < 6) return;

    try {
      setIsProcessing(true);

      await apiVerifyOTP(token);
      setUserConnected(true);

      setIsProcessing(false);
    } catch (error) {
      console.error(error);

      setIsProcessing(false);

      showNotification((error as Error).message, 'error');
    }
  };

  return { handleVerifyOTP, isProcessing, otpRef };
};

export default useMFAVerify;
