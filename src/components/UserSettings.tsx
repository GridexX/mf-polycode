import { Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';

import styles from '../styles/components/UserEditor.module.css';

export default function UserSettings() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    userName: '',
    emails: ['', ''],
    // TODO: use language enum
    preferedLanguage: '',
    biography: '',
  });
  const [loading, setLoading] = React.useState(false);

  // --- Loading data ---
  const initData = async () => {
    setLoading(true);

    // Simulate fetching data from an API
    // TODO: fetch data from API
    setTimeout(() => {
      setState({
        userName: 'John Doe',
        emails: [
          'john.doe@example.com',
          '',
        ],
        preferedLanguage: 'javascript',
        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
          + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
          + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '
          + 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in '
          + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
          + 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui '
          + 'officia deserunt mollit anim id est laborum.',
      });
      setLoading(false);
    }, 2000);
  }
  React.useEffect(() => {initData()}, []);

  // --- Event Handlers ---
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, userName: event.target.value });
  }

  const handleEmailsChange = (
    emailIndex: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedEmails = [...state.emails];
    updatedEmails[emailIndex] = event.target.value;
    setState({ ...state, emails: updatedEmails });
  }

  const handlePreferedLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, preferedLanguage: event.target.value });
  }

  const handleBiographyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, biography: event.target.value });
  }

  const handleSave = async () => {
    setLoading(true);

    // faking api call for now
    // TODO: replace with real api call
    await (new Promise(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }));
  }

  const handleReset = async () => {
    await initData();
  }

  // --- Rendering ---
  return (
    <Box className={styles.container}>
      <Box className={styles.titleContainer}>
        <Typography variant="h3">Settings</Typography>
      </Box>
      <Box className={styles.contentContainer}>
        <Typography
          variant="h4"
          className={styles.subtitle}
          sx={{ color: theme.palette.primary.main }}
        >
          Update your profile
        </Typography>
        <Box className={styles.formContainer}>
          <Box className={styles.formContainer}>
            <Box className={styles.formRow}>
              <Typography
                variant="h5"
                className={styles.formLabel}
                sx={{ color: theme.palette.primary.main }}
              >
                Username
              </Typography>
              <TextField
                onChange={handleUserNameChange}
                type="text"
                label="Username"
                variant="standard"
                value={state.userName}
                className={styles.fieldForm}
              />
            </Box>
            <Box className={styles.formRow}>
              <Typography
                variant="h5"
                className={styles.formLabel}
                sx={{ color: theme.palette.primary.main }}
              >
                Emails
              </Typography>
              <Stack spacing={2} className={styles.fieldForm}>
                <TextField
                  onChange={(event) => handleEmailsChange(0, event)}
                  type="email"
                  label="Primary Email"
                  variant="standard"
                  value={state.emails[0]}
                  className={styles.fieldForm}
                />
                <TextField
                  onChange={(event) => handleEmailsChange(1, event)}
                  type="email"
                  label="Secondary Email"
                  variant="standard"
                  value={state.emails[1]}
                  className={styles.fieldForm}
                />
              </Stack>
            </Box>
            <Box className={styles.formRow}>
              <Typography
                variant="h5"
                className={styles.formLabel}
                sx={{ color: theme.palette.primary.main }}
              >
                Editor Language
              </Typography>
              <TextField
                onChange={handlePreferedLanguageChange}
                type="text"
                label="Editor Language"
                variant="standard"
                value={state.preferedLanguage}
                className={styles.fieldForm}
              />
            </Box>
            <Box className={styles.formRow}>
              <Typography
                variant="h5"
                className={styles.formLabel}
                sx={{ color: theme.palette.primary.main }}
              >
                Biography
              </Typography>
              <TextField
                onChange={handleBiographyChange}
                type="text"
                label="Biography"
                variant="standard"
                multiline
                value={state.biography}
                className={styles.fieldForm}
              />
            </Box>
          </Box>
          <Box className={styles.buttonContainer}>
            <Stack direction="row" spacing={10} className={styles.buttonsStack}>
              <LoadingButton
                variant="contained"
                className={styles.saveButton}
                onClick={handleSave}
                loading={loading}
              >
                SAVE
              </LoadingButton>
              <Button
                variant="outlined"
                className={styles.cancelButton}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
