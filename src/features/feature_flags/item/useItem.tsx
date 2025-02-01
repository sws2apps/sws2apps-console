import { useState } from 'react';

const useItem = () => {
  const [expanded, setExpanded] = useState(false);

  return { expanded, setExpanded };
};

export default useItem;
