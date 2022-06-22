import React from 'react';
import {
  useTheme,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from '@mui/material';

import styles from '../../styles/components/filters/Filter.module.css';
import stateStyles from '../../styles/components/filters/TagFilter.module.css';

export default function TagFilter() {
  // import mui theme
  const theme = useTheme();

  const fakeData = ['Javascript', 'Python', 'Rust', 'Java'];

  return (
    <Box
      className={`${styles.container} ${stateStyles.container}`}
      sx={{ border: `1px solid ${theme.palette.text.secondary}` }}
    >
      <Box className={stateStyles.innerContainer}>
        {/* title */}
        <Box className={stateStyles.titleContainer}>
          <Typography className={stateStyles.title}>Tags</Typography>
        </Box>

        {/* checkbox group */}
        <FormGroup className={stateStyles.formGroup}>
          {fakeData && fakeData.length > 0
            ? fakeData.map((language: string) => (
                <FormControlLabel
                  key={language}
                  className={stateStyles.formGroupLabel}
                  control={<Checkbox defaultChecked />}
                  label={language}
                />
              ))
            : 'loading...'}
        </FormGroup>
      </Box>
    </Box>
  );
}
