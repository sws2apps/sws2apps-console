import { Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { GlobalRoleProps } from './index.type';
import useGlobalRole from './useGlobalRole';
import UserItem from '../item';

const GlobalRole = ({ group }: GlobalRoleProps) => {
  const {
    expanded,
    setExpanded,
    handleDeleteUser,
    handleDisableMFA,
    handleUpdateUserBasic,
    handleTerminateAllSessions,
    handleTerminateSession,
    handleCongregationRemove,
  } = useGlobalRole();

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        aria-controls={`panel-${group.global_role}-content"`}
        id={`panel-${group.global_role}-header"`}
      >
        <Typography fontWeight="bold">
          {group.global_role.toUpperCase()} ({group.users.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded &&
          group.users.map((person) => (
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
              onTerminateSessions={() => handleTerminateAllSessions(person.id)}
              onCongregationRemove={() => handleCongregationRemove(person.id)}
            />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default GlobalRole;
