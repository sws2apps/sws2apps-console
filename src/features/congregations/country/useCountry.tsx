import { useState } from 'react';

const useCongregationCountry = () => {
  const [expanded, setExpanded] = useState(false);

  return { expanded, setExpanded };
};

export default useCongregationCountry;
