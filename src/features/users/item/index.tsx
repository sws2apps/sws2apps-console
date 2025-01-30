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
import DeleteUser from '../delete_user';
import Label from '../label';
import MFAStatus from '../mfa_status';
import UpdateBasicInfo from '../update_ basic_info';
import CongRoles from '../cong_roles';

const UserItem = (props: UserItemProps) => {
  const { person, onDelete, onDisableMFA } = props;

  const {
    fullname,
    last_seen,
    firstnameRef,
    emailRef,
    lastnameRef,
    handleUpdate,
    roles,
  } = useUserItem(props);

  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`panel-${person.id}-content"`}
        id={`panel-${person.id}-header"`}
      >
        <Label fullname={fullname} role={person.profile.global_role} />
      </AccordionSummary>
      <AccordionDetails>
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

          <Typography>Basic information</Typography>

          <BasicInfo
            person={person}
            firstnameRef={firstnameRef}
            lastnameRef={lastnameRef}
            emailRef={emailRef}
          />

          <Divider />

          {person.profile.global_role !== 'admin' && (
            <>
              <Typography>Congregation Roles</Typography>
              <CongRoles roles={roles} />
            </>
          )}

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

            <DeleteUser onConfirm={onDelete} />
          </Grid>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserItem;
