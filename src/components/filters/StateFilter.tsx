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
import stateStyles from '../../styles/components/filters/StateFilter.module.css';

export default function StateFilter() {
  // import mui theme
  const theme = useTheme();

  return (
    <Box
      className={`${styles.container} ${stateStyles.container}`}
      sx={{ border: `1px solid ${theme.palette.text.secondary}` }}
    >
      <Box className={stateStyles.innerContainer}>
        {/* title */}
        <Box className={stateStyles.titleContainer}>
          <Typography className={stateStyles.title}>State</Typography>
        </Box>

        {/* checkbox group */}
        <FormGroup className={stateStyles.formGroup}>
          <FormControlLabel
            className={stateStyles.formGroupLabel}
            control={<Checkbox defaultChecked />}
            label="Done"
          />
          <FormControlLabel
            className={stateStyles.formGroupLabel}
            control={<Checkbox defaultChecked />}
            label="Started"
          />
        </FormGroup>
      </Box>
    </Box>
  );
}
