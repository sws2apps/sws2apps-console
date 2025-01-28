import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  AssignmentInd,
  Delete,
  NoEncryptionGmailerrorred,
  Save,
  Shield,
  Token,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { IconAccount } from '@icons/index';
import { UserItemProps } from './index.type';
import useUserItem from './useItem';

const UserItem = ({ person }: UserItemProps) => {
  const {
    fullname,
    firstname,
    lastname,
    email,
    last_seen,
    handleDeleteUser,
    handleDisableMFA,
  } = useUserItem(person);

  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`panel-${person.id}-content"`}
        id={`panel-${person.id}-header"`}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconAccount />
          <Typography>{fullname}</Typography>
        </Box>
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {person.profile.global_role === 'vip' && (
                <Shield color="warning" />
              )}

              {person.profile.global_role === 'pocket' && (
                <AssignmentInd color="secondary" />
              )}

              {person.profile.global_role === 'vip' && (
                <Typography>
                  MFA status:{' '}
                  {person.profile.mfa_enabled ? (
                    <Typography
                      component="span"
                      variant="button"
                      color="success"
                    >
                      ENABLED
                    </Typography>
                  ) : (
                    <Typography component="span" color="secondary">
                      DISABLED
                    </Typography>
                  )}
                </Typography>
              )}

              {person.profile.global_role === 'pocket' && (
                <Typography>Pocket account</Typography>
              )}
            </Box>
            <Stack spacing="4px">
              <Typography variant="subtitle2" textAlign="right">
                Created at:{' '}
                {new Date(person.profile.createdAt).toLocaleString()}
              </Typography>

              {last_seen && (
                <Typography variant="subtitle2" textAlign="right">
                  Last seen at: {last_seen}
                </Typography>
              )}
            </Stack>
          </Box>

          <Divider />

          <Typography>Personal information</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12, lg: 5 }}>
              <TextField
                fullWidth
                label="Last name"
                size="small"
                value={lastname}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3.5 }}>
              <TextField
                fullWidth
                label="First name"
                size="small"
                value={firstname}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3.5 }}>
              <TextField fullWidth label="Email" size="small" value={email} />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button variant="contained" startIcon={<Save />}>
              Update
            </Button>
            <Button variant="contained" color="secondary" startIcon={<Token />}>
              Revoke token
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleDisableMFA}
              startIcon={<NoEncryptionGmailerrorred />}
            >
              Disable MFA
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserItem;
