import { useMemo } from 'react';
import { SessionItemProps } from './index.types';

const useSessionItem = ({ session, onTerminate }: SessionItemProps) => {
  const last_seen = useMemo(() => {
    if (!session.last_seen) return '';

    return new Date(session.last_seen).toLocaleString();
  }, [session]);

  const browser = useMemo(() => {
    let tmp = session.device.browserName;

    if (session.device.os.length > 0) {
      tmp += ` - ${session.device.os}`;
    }

    return tmp;
  }, [session]);

  const location = useMemo(() => {
    let tmp = session.ip;

    if (session.country_name.length > 0) {
      tmp += ` - ${session.country_name}`;
    }

    return tmp;
  }, [session]);

  const handleTerminate = () => {
    if (session.isSelf) return;

    onTerminate(session.identifier);
  };

  return { handleTerminate, last_seen, browser, location };
};

export default useSessionItem;
