import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface IProps {
  children: ReactNode;
}

function PageWrapper(props: IProps) {
  return (
    <Container maxWidth="md">
      <Box my={10}>{props.children}</Box>
    </Container>
  );
}

export default PageWrapper;
