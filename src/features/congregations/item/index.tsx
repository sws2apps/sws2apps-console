import { Box, Button, CircularProgress, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { IconCongregation } from '@icons/index';
import { CongregationItemProps } from './index.type';
import useCongregationItem from './useItem';
import UserItem from '@features/users/item';

const CongregationItem = ({ congregation }: CongregationItemProps) => {
  const { expanded, setExpanded, isLoading, persons } = useCongregationItem(
    congregation.id
  );

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        aria-controls={`panel-${congregation.id}-content"`}
        id={`panel-${congregation.id}-header"`}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconCongregation />
          <Typography>
            {congregation.cong_name} ({congregation.cong_number})
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading && <CircularProgress />}

        {!isLoading && (
          <Box sx={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button variant="contained">Rename</Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Box>

            {persons.length > 0 && (
              <>
                <Typography fontWeight="bold">
                  Congregation persons ({persons.length})
                </Typography>
              </>
            )}

            {persons.map((person) => (
              <UserItem key={person.id} person={person} />
            ))}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CongregationItem;
