import { Stack } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@components/accordion';
import { FeatureFlagItemProps } from './index.type';
import useItem from './useItem';
import FeatureFlagDetails from '../details';
import FlagCongregations from '../flag_congregations';
import FlagUsers from '../flag_users';
import Label from '../label';

const FeatureFlagItem = (props: FeatureFlagItemProps) => {
  const { flag } = props;

  const { expanded, setExpanded } = useItem();

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        aria-controls={`panel-${flag.id}-content"`}
        id={`panel-${flag.id}-header"`}
      >
        <Label flag={flag} />
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <Stack spacing="24px">
            <FeatureFlagDetails flag={flag} />

            {flag.availability === 'congregation' && (
              <FlagCongregations flag={flag} />
            )}

            {flag.availability === 'user' && <FlagUsers flag={flag} />}
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default FeatureFlagItem;
