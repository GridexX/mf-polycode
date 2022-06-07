import {
  Components,
  createTheme,
  Palette,
  PaletteMode,
  Theme,
} from '@mui/material';
import MuiButton from './components/Button';

// Put component styles here
const components: Components<Theme> = {
  MuiButton,
};

// Color palettes
const lightPalette: Partial<Palette> = {};
const darkPalette: Partial<Palette> = {};

export default function GetTheme(mode: PaletteMode) {
  return createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    components,
  });
}
