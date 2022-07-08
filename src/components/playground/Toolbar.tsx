// import { PlayArrow } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  SelectChangeEvent,
  Stack,
  Tooltip,
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import React, { useCallback } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import CustomSelect from '../base/Select';
import { useEditorContext } from './CodeEditorContext';

import styles from '../../styles/components/playground/Toolbar.module.css';
import { useTranslation } from '../../lib/translations';

export default function Toolbar() {
  const { i18n } = useTranslation();

  const context = useEditorContext();

  const handleChangeLanguage = useCallback(
    (evt: SelectChangeEvent<string>) => {
      context.setLanguage(evt.target.value);
    },
    [context]
  );

  return (
    <Box className={styles.container}>
      <CustomSelect
        label="language"
        value={context.language}
        onChange={handleChangeLanguage}
        items={context.availableLanguages.map((l) => ({
          name: l,
          value: l,
        }))}
        size="small"
      />

      <Box flexGrow={1} />

      <Stack spacing={1} direction="row">
        <Tooltip title={i18n.t('components.playground.toolbar.resetCode')}>
          <IconButton onClick={context.resetCode} color="primary">
            <ReplayIcon />
          </IconButton>
        </Tooltip>

        {/* <Button
          variant="outlined"
          startIcon={<PlayArrow />}
          onClick={() => {
            console.log('run custom input');
          }}
        >
          Run
        </Button> */}
        <Button variant="contained" startIcon={<PublishIcon />}>
          {i18n.t('components.playground.toolbar.submit')}
        </Button>
      </Stack>
    </Box>
  );
}
