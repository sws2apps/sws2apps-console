import {
  Box,
  Chip,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { IconCongregation } from '@icons/index';
import { CongregationItemProps } from './index.type';
import useCongregationItem from './useItem';
import CongregationAccessRequest from '../access_request';
import DeleteCongregation from '../delete_congregation';
import SpeakersKeyReset from '../speakers_key_reset';
import UserItem from '@features/users/item';

const CongregationItem = (props: CongregationItemProps) => {
  const { congregation } = props;

  const {
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
  } = useCongregationItem(props);

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        aria-controls={`panel-${congregation.id}-content"`}
        id={`panel-${congregation.id}-header"`}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconCongregation />
            <Typography>
              ({congregation.cong_number}) {congregation.cong_name}
            </Typography>

            <Chip
              label={new Date(congregation.createdAt).toLocaleString()}
              size="small"
            />
          </Box>

          {isProcessing && <CircularProgress size={20} />}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <>
            {isLoading && <CircularProgress />}

            {!isLoading && (
              <Stack spacing="12px">
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataSync}
                      onChange={handleToggleDataSync}
                    />
                  }
                  label="Data synchronization enabled"
                />

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <DeleteCongregation onConfirm={handleDeleteCongregation} />
                </Box>

                {persons.length > 0 && (
                  <Stack spacing="12px">
                    <Typography fontWeight="bold">
                      PERSONS ({persons.length})
                    </Typography>

                    <Box>
                      {persons.map((person) => (
                        <UserItem
                          key={person.id}
                          person={person}
                          onDisableMFA={() => handleDisableMFA(person.id)}
                          onDelete={() => handleDeleteUser(person.id)}
                          onUpdate={(lastname, firstname, email, roles) =>
                            handleUpdateUserBasic({
                              userId: person.id,
                              email,
                              firstname,
                              lastname,
                              roles,
                            })
                          }
                          onTerminateSession={(identifier) =>
                            handleTerminateSession(person.id, identifier)
                          }
                          onTerminateSessions={() =>
                            handleTerminateAllSessions(person.id)
                          }
                        />
                      ))}
                    </Box>
                  </Stack>
                )}

                <Stack spacing="12px">
                  <Typography fontWeight="bold">
                    SPEAKERS SHARING ({requests.length})
                  </Typography>

                  {hasSpeakersKey && (
                    <Box>
                      <SpeakersKeyReset onClick={handleResetSpeakersKey} />
                    </Box>
                  )}

                  {requests.length > 0 && (
                    <Box>
                      {requests.map((request) => (
                        <CongregationAccessRequest
                          key={request.request_id}
                          request={request}
                          onRequestDelete={handleDeleteAccessRequest}
                        />
                      ))}
                    </Box>
                  )}
                </Stack>
              </Stack>
            )}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CongregationItem;
