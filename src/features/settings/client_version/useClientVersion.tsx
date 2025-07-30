import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  apiClientVersionGet,
  apiClientVersionSet,
} from '@services/api/settings';
import { showNotification } from '@services/app/notification';

const useClientVersion = () => {
  const { data, refetch } = useQuery({
    queryFn: apiClientVersionGet,
    queryKey: ['client-version'],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [version, setVersion] = useState('');

  const handleChange = (value: string) => setVersion(value);

  const handleSave = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      const newVersion = await apiClientVersionSet(version);
      await refetch();

      setVersion(newVersion);

      setIsSaving(false);

      showNotification(`Minimum client version set to ${version}`, 'success');
    } catch (error) {
      setIsSaving(false);
      setVersion(data ?? '');

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    if (data) {
      setVersion(data);
    }
  }, [data]);

  return { version, handleSave, handleChange };
};

export default useClientVersion;
