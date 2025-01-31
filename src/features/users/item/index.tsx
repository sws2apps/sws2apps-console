import { Box, Divider, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { NoEncryptionGmailerrorred, Token } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { UserItemProps } from './index.type';
import useUserItem from './useItem';
import Activity from '../activity';
import BasicInfo from '../basic_info';
import ButtonGrid from '../button_grid';
import CongRoles from '../cong_roles';
import DeleteUser from '../delete_user';
import Label from '../label';
import MFAStatus from '../mfa_status';
import SessionsList from '../sessions_list';
import UpdateBasicInfo from '../update_ basic_info';
import TerminateSessions from '../terminate_sessions';

const UserItem = (props: UserItemProps) => {
  const {
    person,
    onDelete,
    onDisableMFA,
    onTerminateSessions,
    onTerminateSession,
  } = props;

  const {
    fullname,
    last_seen,
    firstnameRef,
    emailRef,
    lastnameRef,
    handleUpdate,
    roles,
    expanded,
    setExpanded,
    congregation,
    handleUpdateRole,
  } = useUserItem(props);

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        aria-controls={`panel-${person.id}-content"`}
        id={`panel-${person.id}-header"`}
      >
        <Label
          fullname={fullname}
          role={person.profile.global_role}
          congregation={congregation}
        />
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <Stack spacing="16px">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <MFAStatus
                role={person.profile.global_role}
                mfa_enabled={person.profile.mfa_enabled}
              />

              <Activity
                createdAt={person.profile.createdAt}
                last_seen={last_seen}
              />
            </Box>

            <Divider />

            <Typography variant="button" fontWeight="bold">
              Basic information
            </Typography>

            <BasicInfo
              person={person}
              firstnameRef={firstnameRef}
              lastnameRef={lastnameRef}
              emailRef={emailRef}
            />

            {person.profile.global_role !== 'admin' && (
              <>
                <Divider />

                {person.profile.global_role === 'vip' && (
                  <Typography variant="button" fontWeight="bold">
                    Congregation Roles
                  </Typography>
                )}

                <CongRoles
                  global_role={person.profile.global_role}
                  roles={roles}
                  onChange={(role, checked) => handleUpdateRole(role, checked)}
                />
              </>
            )}

            {person.sessions.length > 0 && (
              <>
                <Divider />
                <SessionsList
                  sessions={person.sessions}
                  onTerminate={onTerminateSession}
                />
              </>
            )}

            <Divider />

            <Grid container spacing={{ xs: 1, md: 2 }}>
              <UpdateBasicInfo onConfirm={handleUpdate} />

              {person.profile.mfa_enabled && (
                <>
                  <ButtonGrid color="secondary" startIcon={<Token />}>
                    Revoke token
                  </ButtonGrid>

                  <ButtonGrid
                    color="warning"
                    onClick={onDisableMFA}
                    startIcon={<NoEncryptionGmailerrorred />}
                  >
                    Disable MFA
                  </ButtonGrid>
                </>
              )}

              {person.sessions.length > 0 && (
                <TerminateSessions onConfirm={onTerminateSessions} />
              )}

              <DeleteUser onConfirm={onDelete} />
            </Grid>
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default UserItem;
