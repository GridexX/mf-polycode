import React from 'react';
import {
  useTheme,
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

import styles from '../../styles/components/filters/Filter.module.css';
import sortStyles from '../../styles/components/filters/SortFilter.module.css';

export default function SortFilter() {
  // import mui theme
  const theme = useTheme();

  return (
    <Box
      className={styles.container}
      sx={{ border: `1px solid ${theme.palette.text.secondary}` }}
    >
      <Box className={sortStyles.innerContainer}>
        {/* title */}
        <Box className={sortStyles.titleContainer}>
          <Typography className={sortStyles.title}>Sort</Typography>
        </Box>

        {/* radio group */}
        <RadioGroup
          className={sortStyles.radioGroup}
          defaultValue="name"
          name="radio-buttons-group"
        >
          <FormControlLabel
            className={sortStyles.formGroupLabel}
            value="name"
            control={<Radio />}
            label="Name"
          />
          <FormControlLabel
            className={sortStyles.formGroupLabel}
            value="date"
            control={<Radio />}
            label="Date"
          />
          <FormControlLabel
            className={sortStyles.formGroupLabel}
            value="completion"
            control={<Radio />}
            label="Completion"
          />
        </RadioGroup>
      </Box>
    </Box>
  );
}
