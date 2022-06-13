import * as React from 'react';
import { Box, Button, Stack, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../../lib/translations';

import styles from '../../styles/components/account/Menu.module.css';
import profileImage from '../../../public/images/profil_image.svg';

type Props = {
  buttonSelected: 'profile' | 'settings' | 'teams' | 'password';
};

export default function Menu({ buttonSelected }: Props) {
  const { i18n } = useTranslation();

  // import MUI theme
  const theme = useTheme();

  return (
    <Box className={styles.container}>
      <Box className={styles.innerContainer}>
        {/* profile image */}
        <Box className={styles.profileImage}>
          <Image src={profileImage} />
        </Box>
        {/* navigation buttons */}
        <Box
          sx={{ color: theme.palette.text.primary }}
          className={styles.navigationButtons}
        >
          <Stack direction="column" spacing={3}>
            <Link href="/account/profile">
              <Button
                id="profile"
                className={styles.button}
                startIcon={<PersonIcon className={styles.icon} />}
                color={buttonSelected === 'profile' ? 'primary' : 'inherit'}
              >
                {i18n.t('account.menu.profile')}
              </Button>
            </Link>
            <Link href="/account/settings">
              <Button
                id="settings"
                className={styles.button}
                startIcon={<SettingsIcon className={styles.icon} />}
                color={buttonSelected === 'settings' ? 'primary' : 'inherit'}
              >
                {i18n.t('account.menu.settings')}
              </Button>
            </Link>
            <Link href="/account/teams">
              <Button
                id="teams"
                className={styles.button}
                startIcon={<PeopleAltIcon className={styles.icon} />}
                color={buttonSelected === 'teams' ? 'primary' : 'inherit'}
              >
                {i18n.t('account.menu.teams')}
              </Button>
            </Link>
            <Link href="/account/password">
              <Button
                id="password"
                className={styles.button}
                startIcon={<LockIcon className={styles.icon} />}
                color={buttonSelected === 'password' ? 'primary' : 'inherit'}
              >
                {i18n.t('account.menu.password')}
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
