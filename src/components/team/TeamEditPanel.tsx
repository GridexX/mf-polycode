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
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import styles from '../../styles/components/account/Settings.module.css';
import TextInput from '../base/TextInput';
import { useTranslation } from '../../lib/translations';
import TeamRow from './TeamRow';
import { User } from '../../lib/api/user';
import { Team } from '../../lib/api/team';

const fakeData: Team = {
  id: '1',
  rank: 1,
  name: 'GridexX Team',
  points: 45000,
  description: 'This is the team description',
  members: [
    {
      id: '1',
      username: 'Judox',
      description: 'This is the user description',
      rank: 1,
      points: 25000,
    },
    {
      id: '2',
      username: 'GridexX',
      description: 'This is the user description',
      rank: 1,
      points: 20000,
    },
  ],
  captain: {
    id: '2',
    rank: 1,
    username: 'Judox',
    description: 'This is the user description',
    points: 25000,
  },
};

type EditorState = {
  name: string;
  description: string;
  members?: User[];
  captain?: User;
};

type EditorErrors = {
  name: string;
  description: string;
};

const defaultEditorStateValue = {
  name: '',
  description: '',
  members: [],
  captain: undefined,
};

const defaultEditorErrors = {
  name: '',
  description: '',
};

export default function TeamEditorPanel() {
  // import mui theme
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [defaultEditorState, setDefaultEditorState] =
    React.useState<EditorState>(defaultEditorStateValue);
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
  const checkName = () => {
    if (editorState.name.length < 3) {
      setEditorErrors({
        ...editorErrors,
        name: i18n.t('components.team.teamEditPanel.nameTooShort'),
      });
      return false;
    }
    if (editorState.name.length > 20) {
      setEditorErrors({
        ...editorErrors,
        name: i18n.t('components.team.teamEditPanel.nameTooLong'),
      });
      return false;
    }
    setEditorErrors({
      ...editorErrors,
      name: '',
    });
    return true;
  };

  const checkDescription = () => {
    if (editorState.description.length > 500) {
      setEditorErrors({
        ...editorErrors,
        description: i18n.t('components.team.teamEditPanel.descriptionTooLong'),
      });
      return false;
    }
    setEditorErrors({
      ...editorErrors,
      description: '',
    });
    return true;
  };

  const validate = () => checkName() && checkDescription();

  // --- update data ---
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorState({
      ...editorState,
      name: event.target.value,
    });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditorState({
      ...editorState,
      description: event.target.value,
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
        <Typography variant="h3" color={theme.palette.text.primary}>
          {i18n.t('components.team.teamEditPanel.title')}
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
            {i18n.t('components.team.teamEditPanel.information')}
          </Typography>

          <Box className={styles.fieldContainer}>
            <Typography
              className={styles.fieldLabel}
              variant="h6"
              sx={{ color: theme.palette.primary.main }}
            >
              {i18n.t('components.team.teamEditPanel.contentName')}
            </Typography>
            <Box className={styles.inputContainer}>
              <TextInput
                label={i18n.t('components.team.teamEditPanel.contentName')}
                value={editorState.name}
                onChange={handleNameChange}
                error={editorErrors.name !== ''}
                helperText={editorErrors.name}
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
              {i18n.t('components.team.teamEditPanel.contentDescription')}
            </Typography>

            {/* Bio content */}
            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={editorState.description}
                onChange={handleDescriptionChange}
                error={editorErrors.description !== ''}
                helperText={editorErrors.description}
              />
            </Box>
          </Box>
          <Stack direction="column" spacing={4} sx={{ mt: 6 }}>
            <>
              <Typography
                className={styles.subContentTitle}
                variant="h4"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('component.team.teamEditPanel.contentMembers')}
              </Typography>
              {(editorState.members?.length ?? 0) > 0 &&
                editorState.members?.map((member) => (
                  <TeamRow
                    name={member.username}
                    points={member.points}
                    isCaptain={
                      editorState.captain?.username === member.username
                    }
                    key={`${member.username}-${member.id}`}
                  />
                ))}
            </>
          </Stack>
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
            {i18n.t('components.team.teamEditPanel.saveButton').toUpperCase()}
          </LoadingButton>
          <Button
            variant="outlined"
            className={styles.resetButton}
            onClick={handleReset}
          >
            {i18n.t('components.team.teamEditPanel.resetButton')}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
