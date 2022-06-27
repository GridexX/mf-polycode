import React from 'react';
import { Box, IconButton, Typography, Stack, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useTranslation } from '../../lib/translations';

import polybunny from '../../images/polybunny-navbar-menu.png';

import styles from '../../styles/components/navbar/Menu.module.css';

type Props = {
  handleMenu: () => void;
};

export default function Menu({ handleMenu }: Props) {
  const { i18n } = useTranslation();

  // --- handle events ---
  const logout = () => {
    console.log('logout');
  };

  return (
    <Box className={styles.container}>
      {/* close button */}
      <Box className={styles.closeIconContainer}>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleMenu}
        >
          <CloseIcon className={styles.closeIcon} />
        </IconButton>
      </Box>

      {/* links container */}
      <Box className={styles.linksContainer}>
        {/* links */}
        <Stack direction="column" alignItems="center" spacing={2}>
          <Link href="/account/profile">
            <Typography className={styles.linkItem} variant="h1">
              {i18n.t('components.navbar.menu.profile')}
            </Typography>
          </Link>
          <Link href="/leaderboard">
            <Typography className={styles.linkItem} variant="h1">
              {i18n.t('components.navbar.menu.leaderboard')}
            </Typography>
          </Link>
          <Link href="/account/settings">
            <Typography className={styles.linkItem} variant="h1">
              {i18n.t('components.navbar.menu.settings')}
            </Typography>
          </Link>
        </Stack>

        {/* logout */}
        <Box className={styles.logoutContaier}>
          <Link href="/">
            <Typography
              className={styles.linkItem}
              variant="h1"
              onClick={logout}
            >
              {i18n.t('components.navbar.menu.logout')}
            </Typography>
          </Link>
        </Box>
      </Box>

      {/* polybunny image */}
      <Box className={styles.imageContainer}>
        <Image
          src={polybunny}
          alt="polybunny image"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
}
