import { Typography } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { CongregationCountryProps } from './index.type';
import useCongregationCountry from './useCountry';
import CongregationItem from '../item';

const CongregationCountry = ({ country }: CongregationCountryProps) => {
  const { expanded, setExpanded } = useCongregationCountry();

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        aria-controls={`panel-${country.country_code}-content"`}
        id={`panel-${country.country_code}-header"`}
      >
        <Typography fontWeight="bold">
          ({country.country_code}) {country.country_name} [
          {country.congregations.length}]
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {expanded &&
          country.congregations.map((congregation) => (
            <CongregationItem
              key={congregation.id}
              congregation={congregation}
            />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default CongregationCountry;
