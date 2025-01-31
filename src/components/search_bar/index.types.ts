import { BoxProps } from '@mui/material';

export type SearchBarProps = BoxProps & {
  placeholder: string;
  value?: string;
  onSearch?: (query: string) => void;
};
