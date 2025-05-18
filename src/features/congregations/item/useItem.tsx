import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import {
  apiCongregationDelete,
  apiCongregationDeleteRequest,
  apiCongregationGet,
  apiCongregationResetSpeakersKey,
  apiCongregationToggleDataSync,
} from '@services/api/congregations';
import {
  congregationBusyState,
  congregationsState,
} from '@states/congregations';
import { showNotification } from '@services/app/notification';
import {
  apiUserDelete,
  apiUserDeleteSession,
  apiUserDeleteSessions,
  apiUserDisableMFA,
  apiUserUpdate,
} from '@services/api/users';
import { APIRequestCongregation, APIUser } from '@definition/api';
import { CongRole } from '@definition/congregation';
import { CongregationItemProps } from './index.type';

const useCongregationItem = ({ congregation }: CongregationItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: () => apiCongregationGet(congregation.id),
    queryKey: ['congregations', congregation.id],
    enabled: expanded,
    refetchOnMount: 'always',
  });

  const setCongregations = useSetAtom(congregationsState);

  const [isProcessing, setIsProcessing] = useAtom(congregationBusyState);

  const [dataSync, setDataSync] = useState(congregation.data_sync);
  const [persons, setPersons] = useState<APIUser[]>([]);
  const [requests, setRequests] = useState<APIRequestCongregation[]>([]);
  const [hasSpeakersKey, setHasSpeakersKey] = useState(false);

  const handleToggleDataSync = async () => {
    if (isProcessing) return;

    try {
      setDataSync((prev) => !prev);

      setIsProcessing(true);

      const res = await apiCongregationToggleDataSync(congregation.id);

      setPersons(res.cong_persons);
      setRequests(res.cong_requests);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleDeleteCongregation = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const congregations = await apiCongregationDelete(congregation.id);
      setCongregations(congregations);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      await apiUserDelete(userId);

      const res = await apiCongregationGet(congregation.id);
      setPersons(res.cong_persons);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleDisableMFA = async (userId: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      await apiUserDisableMFA(userId);

      const res = await apiCongregationGet(congregation.id);
      setPersons(res.cong_persons);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleTerminateAllSessions = async (userId: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      await apiUserDeleteSessions(userId);

      const res = await apiCongregationGet(congregation.id);
      setPersons(res.cong_persons);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleTerminateSession = async (userId: string, identifier: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      await apiUserDeleteSession(userId, identifier);

      const res = await apiCongregationGet(congregation.id);
      setPersons(res.cong_persons);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleUpdateUserBasic = async ({
    email,
    firstname,
    lastname,
    userId,
    roles,
  }: {
    userId: string;
    lastname: string;
    firstname: string;
    email: string;
    roles: CongRole[];
  }) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const remote = persons.find((record) => record.id === userId)!;

      const remoteLastname = remote.profile.lastname.value;
      const remoteFirstname = remote.profile.firstname.value;
      const remoteEmail = remote.profile?.email || '';
      const remoteRoles = remote.profile.congregation?.cong_role || [];

      const roleUpdate =
        roles.length === remoteRoles.length &&
        roles.every((record) => remoteRoles.some((role) => role === record));

      if (
        remoteLastname === lastname &&
        remoteFirstname === firstname &&
        remoteEmail === email &&
        roleUpdate
      ) {
        showNotification('Nothing to update', 'info');

        setIsProcessing(false);
        return;
      }

      await apiUserUpdate({ id: userId, email, firstname, lastname, roles });

      const res = await apiCongregationGet(congregation.id);
      setPersons(res.cong_persons);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleDeleteAccessRequest = async (request_id: string) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const res = await apiCongregationDeleteRequest(
        congregation.id,
        request_id
      );

      setPersons(res.cong_persons);
      setRequests(res.cong_requests);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleResetSpeakersKey = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const res = await apiCongregationResetSpeakersKey(congregation.id);

      setPersons(res.cong_persons);
      setRequests(res.cong_requests);
      setHasSpeakersKey(res.has_speakers_key);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    setPersons([]);
    setRequests([]);

    if (data) {
      if (Array.isArray(data.cong_persons)) {
        setPersons(
          data.cong_persons.sort((a, b) =>
            a.profile.lastname.value.localeCompare(b.profile.lastname.value)
          )
        );
      }

      if (Array.isArray(data.cong_requests)) {
        setRequests(data.cong_requests);
      }

      setHasSpeakersKey(data.has_speakers_key);
    }
  }, [data]);

  return {
    expanded,
    setExpanded,
    isLoading,
    persons,
    handleDeleteCongregation,
    handleDeleteUser,
    handleDisableMFA,
    handleUpdateUserBasic,
    isProcessing,
    handleTerminateAllSessions,
    handleTerminateSession,
    dataSync,
    handleToggleDataSync,
    requests,
    handleDeleteAccessRequest,
    hasSpeakersKey,
    handleResetSpeakersKey,
  };
};

export default useCongregationItem;
