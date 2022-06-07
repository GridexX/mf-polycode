import { ComponentsOverrides, Theme } from '@mui/material';

// Change button style here
const MuiButton: {
  styleOverrides?: ComponentsOverrides<Theme>['MuiButton'];
} = {
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        color: 'red',
      },
      borderRadius: '5px',
    },
  },
};
export default MuiButton;
