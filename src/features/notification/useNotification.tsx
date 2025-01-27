import { useAtom, useAtomValue } from 'jotai';
import {
  notificationMessageState,
  notificationOpenState,
  notificationSeverityState,
} from '@states/notification';

const useNotification = () => {
  const [open, setOpen] = useAtom(notificationOpenState);

  const severity = useAtomValue(notificationSeverityState);
  const message = useAtomValue(notificationMessageState);

  const handleClose = () => setOpen(false);

  return { severity, open, message, handleClose };
};

export default useNotification;
