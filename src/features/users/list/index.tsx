import { Box, CircularProgress, Typography } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@components/accordion';
import useUsersList from './useList';

const UsersList = () => {
  const { isLoading, count,users } = useUsersList();

  return (
    <Box>
      {isLoading && <CircularProgress />}

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography>USERS: {count}</Typography>

          <Box>
            {users.map((person) => (
              <Accordion key={person.id}>
              <AccordionSummary
                aria-controls={`panel-${person.id}-content"`}
                id={`panel-${person.id}-header"`}
              >
                <Typography>{person.profile.lastname.value} {person.profile.firstname.value}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo repellendus quod autem! Quidem, necessitatibus? Numquam, ab quam! Numquam doloribus non delectus ducimus vel minima dolore nesciunt mollitia sapiente? Nam, nihil!</Typography>
              </AccordionDetails>
            </Accordion>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
