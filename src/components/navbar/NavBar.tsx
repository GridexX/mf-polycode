import React, { useState } from 'react';
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
import Menu from './Menu';

import styles from '../../styles/components/navbar/NavBar.module.css';
import { useTranslation } from '../../lib/translations';

import logo from '../../images/logo.png';

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

  // --- states ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- handle events ---
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {!isMenuOpen && (
        <AppBar className={styles.transparent} position="static">
          <Toolbar sx={{ backgroundColor: 'white', m: 1 }}>
            {/* title */}
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Image src={logo} width={72} height={72} />
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

            {/* stack of links */}
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

            {/* separator */}
            <Box sx={{ flexGrow: 1 }} />

            {/* stack of icons */}
            <Stack spacing={4} direction="row">
              {isLoggedIn && (
                <Box className={styles.iconsContainer}>
                  <Polypoints points={polypoints} size="normal" />
                  <IconButton
                    className={styles.menuIcon}
                    size="large"
                    edge="end"
                    color="inherit"
                    onClick={handleMenu}
                  >
                    <MenuRoundedIcon
                      fontSize="large"
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </IconButton>
                </Box>
              )}
              {!isLoggedIn && (
                <span style={{ marginRight: '12px' }}>
                  <NavBarLink href="/sign-in">
                    {i18n.t('components.navbar.sign-in')}
                  </NavBarLink>
                </span>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      )}
      {isMenuOpen && <Menu handleMenu={handleMenu} />}
      {/* Sould be used when the NavBar will be set to fixed */}
      {/* <Toolbar sx={{height: "114px"}} /> */}
    </>
  );
}
