import {
  Components,
  createTheme,
  Palette,
  PaletteMode,
  Theme,
} from '@mui/material';
import MuiButton from './components/Button';
import MuiInputBase from './components/MuiInputBase';
import MuiInputLabel from './components/MuiInputLabel';
import lightTheme from './themes/LightTheme';

// Put component styles here
const components: Components<Theme> = {
  MuiButton,
  MuiInputBase,
  MuiInputLabel,
};

// Color palettes
const lightPalette: Partial<Palette> = lightTheme.palette;
const darkPalette: Partial<Palette> = {};

export default function GetTheme(mode: PaletteMode) {
  return createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    components,
  });
}
