import { Box, Button, Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { IconCongregation } from '@icons/index';
import { CongregationItemProps } from './index.type';
import useCongregationItem from './useItem';

const CongregationItem = ({ congregation }: CongregationItemProps) => {
  const { expanded, setExpanded } = useCongregationItem();

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="contained">Rename</Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CongregationItem;
