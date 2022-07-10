import { Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

export default function ErrorPage() {
  const theme = useTheme();
  // TODO Add the picture with the bunny + translations
  return (
    <Stack
      spacing={3}
      alignItems="center"
      height="100vh"
      width="100vw"
      color={theme.palette.text.primary}
    >
      <Typography variant="h1">Page not found</Typography>
      <Typography variant="body1">Go in safer place</Typography>
      <Button
        variant="contained"
        sx={{
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        HOME
      </Button>
    </Stack>
  );
}
