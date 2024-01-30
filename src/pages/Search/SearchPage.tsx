import React from 'react';
import { Typography, Stack, Container,Paper } from '@mui/material';
import SearchApp from '@/components/Search/SearchApp';

const Search = () => {
  return (
    <Container sx={{ py: 0.5, position: 'relative' }}>
        <Paper elevation={1}>
        <SearchApp />
        </Paper>
        {/* <Typography textAlign="center" variant="subtitle1">
          React + TS + Vite + Redux + RTK + MUI + RRD + Prettier
        </Typography>
      </Stack> */}
    </Container>
  );
};

export default Search;
