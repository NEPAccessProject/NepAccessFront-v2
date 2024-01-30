import React from 'react';
import TemplateTester from '@/components/TemplateTester/TemplateTester';
import { Typography, Stack, Container } from '@mui/material';
import Counter from '@/components/Counter/Counter';
import SearchApp from '@/components/Search/SearchApp';

const Home = () => {
  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <Stack gap={1} my={2}>
        <SearchApp/>
      </Stack>
      
    </Container>
  );
};

export default Home;
