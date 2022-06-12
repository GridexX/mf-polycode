/* eslint-disable no-nested-ternary */
import React from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  TextField,
  useTheme,
  Button,
  Stack,
  SelectChangeEvent,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import CustomSelect from '../base/Select';
import styles from '../../styles/components/account/Settings.module.css';
import TextInput from '../base/TextInput';
import { useTranslation } from '../../lib/translations';

const fakeData = {
  username: 'GridexX',
  emails: ['arsene582@gmail.com', 'theBestPlayer@gmail.com'],
  preferedLanguage: 'javascript',
  polypoints: 24000,
  rank: 1,
  biography: 'This is my biography',
};

type EditorState = {
  username: string;
  emails: string[];
  preferedLanguage: string;
  biography: string;
};

type EditorErrors = {
  username: string;
  emails: string[];
  biography: string;
};

const defaultEditorErrors = {
  username: '',
  emails: ['', ''],
  biography: '',
};

export default function Settings() {
  // import mui theme
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [defaultEditorState, setDefaultEditorState] =
    React.useState<EditorState>({
      username: '',
      emails: ['', ''],
      preferedLanguage: 'javascript',
      biography: '',
    });
  const [editorState, setEditorState] =
    React.useState<EditorState>(defaultEditorState);
  const [editorErrors, setEditorErrors] =
    React.useState<EditorErrors>(defaultEditorErrors);
  const [loading, setLoading] = React.useState(false);

  // --- init data ---
  const initData = async () => {
    // Fake api call
    setLoading(true);
    setTimeout(() => {
      setDefaultEditorState(fakeData);
      setEditorState(fakeData);
      setLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    initData();
  }, []);

  // --- error checks ---
  const checkUsername = () => {
    if (editorState.username.length < 3) {
      setEditorErrors({
        ...editorErrors,
        username: i18n.t('account.settings.errors.usernameTooShort'),
      });
      return false;
    }
    if (editorState.username.length > 20) {
      setEditorErrors({
        ...editorErrors,
        username: i18n.t('account.settings.errors.usernameTooLong'),
      });
      return false;
    }
    setEditorErrors({
      ...editorErrors,
      username: '',
    });
    return true;
  };

  const checkEmails = (index: number) => {
    if (editorState.emails[index].length < 3) {
      const newEmails = [...editorErrors.emails];
      newEmails[index] = i18n.t('account.settings.errors.emailTooShort');
      setEditorErrors({
        ...editorErrors,
        emails: newEmails,
      });
      return false;
    }
    if (editorState.emails[index].length > 50) {
      const newEmails = [...editorErrors.emails];
      newEmails[index] = i18n.t('account.settings.errors.emailTooLong');
      setEditorErrors({
        ...editorErrors,
        emails: newEmails,
      });
      return false;
    }
    if (editorState.emails[index].indexOf('@') === -1) {
      const newEmails = [...editorErrors.emails];
      newEmails[index] = i18n.t('account.settings.errors.emailInvalid');
      setEditorErrors({
        ...editorErrors,
        emails: newEmails,
      });
      return false;
    }
    const newEmails = [...editorErrors.emails];
    newEmails[index] = '';
    setEditorErrors({
      ...editorErrors,
      emails: newEmails,
    });
    return true;
  };

  const checkBiography = () => {
    if (editorState.biography.length > 500) {
      setEditorErrors({
        ...editorErrors,
        biography: i18n.t('account.settings.errors.biographyTooLong'),
      });
      return false;
    }
    setEditorErrors({
      ...editorErrors,
      biography: '',
    });
    return true;
  };

  const validate = () =>
    checkUsername() && checkEmails(0) && checkEmails(1) && checkBiography();

  // --- update data ---
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState({
      ...editorState,
      username: event.target.value,
    });
  };

  const handleEmailChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEmails = [...editorState.emails];
    newEmails[index] = event.target.value;
    setEditorState({
      ...editorState,
      emails: newEmails,
    });
  };

  const handlePreferedLanguageChange = (event: SelectChangeEvent<string>) => {
    setEditorState({
      ...editorState,
      preferedLanguage: event.target.value,
    });
  };

  const handleBiographyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditorState({
      ...editorState,
      biography: event.target.value,
    });
  };

  const handleSave = () => {
    if (validate()) {
      setEditorErrors(defaultEditorErrors);
      setLoading(true);
      setTimeout(() => {
        toast.info('Saved');
        setLoading(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    setEditorErrors(defaultEditorErrors);
    setEditorState(defaultEditorState);
  };

  // --- render ---
  return (
    <Box className={styles.container}>
      {/* panel title */}
      <Box className={styles.titleContainer}>
        <Typography variant="h3" color="inherit">
          {i18n.t('account.settings.titlePage')}
        </Typography>
      </Box>
      {/* content container */}
      <Box className={styles.formContainer}>
        {/* Information */}
        <Box className={styles.inputsContainer}>
          <Typography
            className={styles.subContentTitle}
            variant="h4"
            sx={{ color: theme.palette.primary.main }}
          >
            {i18n.t('account.settings.information')}
          </Typography>

          {/* Username */}
          <Box className={styles.fieldContainer}>
            <Typography
              className={styles.fieldLabel}
              variant="h6"
              sx={{ color: theme.palette.primary.main }}
            >
              {i18n.t('account.settings.username')}
            </Typography>
            <Box className={styles.inputContainer}>
              <TextInput
                label={i18n.t('account.settings.username')}
                value={editorState.username}
                onChange={handleUsernameChange}
                error={editorErrors.username !== ''}
                helperText={editorErrors.username}
              />
            </Box>
          </Box>

          {/* Email */}
          <Box className={styles.fieldContainer}>
            <Typography
              className={styles.fieldLabel}
              variant="h6"
              sx={{ color: theme.palette.primary.main }}
            >
              {i18n.t('account.settings.emails')}
            </Typography>
            <Box className={styles.emailsContainer}>
              <TextInput
                label={i18n.t('account.settings.primaryEmail')}
                value={editorState.emails[0]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleEmailChange(0, e)
                }
                error={editorErrors.emails[0] !== ''}
                helperText={editorErrors.emails[0]}
              />
              <TextInput
                label={i18n.t('account.settings.secondaryEmail')}
                value={editorState.emails[1]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleEmailChange(1, e)
                }
                error={editorErrors.emails[1] !== ''}
                helperText={editorErrors.emails[1]}
              />
            </Box>
          </Box>
          {/* PreferedLanguage */}
          <Box className={styles.fieldContainer}>
            <Typography
              className={styles.fieldLabel}
              variant="h6"
              sx={{ color: theme.palette.primary.main }}
            >
              {i18n.t('account.settings.preferedLanguage')}
            </Typography>
            <Box className={styles.inputContainer}>
              <CustomSelect
                label={i18n.t('account.settings.preferedLanguage')}
                items={[
                  { name: 'Java', value: 'java' },
                  { name: 'JavaScript', value: 'javascript' },
                  { name: 'Python', value: 'python' },
                  { name: 'Rust', value: 'rust' },
                ]}
                value={editorState.preferedLanguage}
                onChange={handlePreferedLanguageChange}
              />
            </Box>
          </Box>

          {/* Biography */}
          <Box className={styles.verticalFieldContainer}>
            <Typography
              className={styles.verticalFieldLabel}
              variant="h6"
              sx={{ color: theme.palette.primary.main }}
            >
              {i18n.t('account.settings.biography')}
            </Typography>

            {/* Bio content */}
            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={editorState.biography}
                onChange={handleBiographyChange}
                error={editorErrors.biography !== ''}
                helperText={editorErrors.biography}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.actionsContainer}>
        <Stack spacing={2} direction="row">
          <LoadingButton
            variant="contained"
            className={styles.saveButton}
            onClick={handleSave}
            loading={loading}
          >
            {i18n.t('account.settings.saveButton').toUpperCase()}
          </LoadingButton>
          <Button
            variant="outlined"
            className={styles.resetButton}
            onClick={handleReset}
          >
            {i18n.t('account.settings.resetButton')}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
