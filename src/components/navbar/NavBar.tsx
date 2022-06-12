import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Image from 'next/image';
import Polypoints from '../Polypoints';
import NavBarLink from './NavBarLink';
import styles from '../../styles/components/NavBar.module.css';
import { useTranslation } from '../../lib/translations';

export default function NavBar() {
  const context = {
    isLoggedIn: true,
    user: {
      username: 'GridexX',
      polypoints: 24000,
    },
  };

  const { isLoggedIn } = context;
  const { polypoints } = context.user;

  const theme = useTheme();
  const { i18n } = useTranslation();

  return (
    <>
      <AppBar className={styles.transparent} position="static">
        <Toolbar sx={{ backgroundColor: 'white', m: 1 }}>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Image src="/images/logo.png" width={72} height={72} />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            color={theme.palette.primary.main}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Poly<span style={{ color: 'black' }}>Code</span>
          </Typography>
          <Stack
            spacing={{ lg: 10, xl: 16 }}
            direction="row"
            sx={{ ml: 18, display: { xs: 'none', md: 'none', lg: 'flex' } }}
          >
            <NavBarLink href="/practice">
              {i18n.t('components.navbar.practice')}
            </NavBarLink>
            <NavBarLink href="/challenge">
              {i18n.t('components.navbar.challenge')}
            </NavBarLink>
            <NavBarLink href="/certification">
              {i18n.t('components.navbar.certification')}
            </NavBarLink>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Stack
            spacing={4}
            direction="row"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {isLoggedIn && (
              <>
                <Polypoints points={polypoints} size='normal' />
                <IconButton
                  size="large"
                  edge="end"
                  // aria-controls={menuId}
                  // aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <MenuRoundedIcon
                    fontSize="large"
                    sx={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </>
            )}
            {!isLoggedIn && (
              <span style={{ marginRight: '12px' }}>
                <NavBarLink href="/sign-in">
                  {i18n.t('components.navbar.sign-in')}
                </NavBarLink>
              </span>
            )}
          </Stack>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Sould be used when the NavBar will be set to fixed */}
      {/* <Toolbar sx={{height: "114px"}} /> */}
    </>
  );
}
