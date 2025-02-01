import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { IconCongregation } from '@icons/index';
import { CongregationItemProps } from './index.type';
import useCongregationItem from './useItem';
import UserItem from '@features/users/item';
import DeleteCongregation from '../delete_congregation';

const CongregationItem = ({ congregation }: CongregationItemProps) => {
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
  } = useCongregationItem(congregation.id);

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
              <Box
                sx={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <DeleteCongregation onConfirm={handleDeleteCongregation} />
                </Box>

                {persons.length > 0 && (
                  <>
                    <Typography fontWeight="bold">
                      PERSONS ({persons.length})
                    </Typography>
                  </>
                )}

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
              </Box>
            )}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CongregationItem;
