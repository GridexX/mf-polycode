import {
  Components,
  createTheme,
  Palette,
  PaletteMode,
  Theme,
} from '@mui/material';
import MuiButton from './components/base/Button';
import MuiInputBase from './components/base/MuiInputBase';
import MuiInputLabel from './components/base/MuiInputLabel';
import lightTheme from './LightTheme';

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
