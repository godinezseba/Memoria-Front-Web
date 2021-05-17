import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export default function Loading() {
  return (
    <Box display="flex" height="100%" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}
