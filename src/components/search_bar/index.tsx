import { Search } from '@mui/icons-material';
import { SearchBarProps } from './index.types';
import { SearchBox, SearchIconWrapper, StyledInputBase } from './index.styles';

const SearchBar = ({ placeholder, onSearch, value }: SearchBarProps) => {
  return (
    <SearchBox>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchBox>
  );
};

export default SearchBar;
