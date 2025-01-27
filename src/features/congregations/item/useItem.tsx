import { useState } from 'react';

const useCongregationItem = () => {
  const [expanded, setExpanded] = useState(false);

  return { expanded, setExpanded };
};

export default useCongregationItem;
