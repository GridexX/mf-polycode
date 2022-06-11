import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Divider,
  Link as MuiLink,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from '../lib/translations';

import styles from '../styles/pages/SignIn.module.css';
import polybunny from '../../public/images/polybunny-do.png';

export default function SignIn() {
  const { i18n } = useTranslation();

  // import Next router
  const router = useRouter();

  // import mui theme
  const theme = useTheme();

  // form state

  const [state, setState] = useState({ email: '', password: '' });

  // progress indicator
  const [loading, setLoading] = useState(false);

  // --- Event handlers ---

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, email: event.target.value });
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, password: event.target.value });
  };

  const handleLogin = () => {
    setLoading(true);

    const apiCall = new Promise<{ username: string }>((resolve) => {
      console.warn('Faking request to backend');

      setTimeout(() => {
        resolve({ username: 'test' });
      }, 1000);
    });

    // redirect to home page
    apiCall.then(() => {
      router.push('/');
    });

    // handle error
    apiCall.catch((reason) => {
      // TODO : use notification

      console.error(reason);
    });

    apiCall.finally(() => {
      setLoading(false);
    });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.side}>
        <Image src={polybunny} />
      </Box>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Box className={styles.side}>
        <Box className={styles.loginForm}>
          <Typography variant="h4">
            <span style={{ color: theme.palette.primary.main }}>Poly</span>Code
          </Typography>

          <Stack spacing={2}>
            <TextField
              type="email"
              onChange={handleEmailChange}
              label={i18n.t('auth.email')}
              variant="standard"
            />

            <TextField
              type="password"
              onChange={handlePasswordChange}
              label={i18n.t('auth.password')}
              variant="standard"
            />
          </Stack>
          <LoadingButton
            variant="contained"
            className={styles.loginButton}
            onClick={handleLogin}
            loading={loading}
          >
            {i18n.t('auth.signIn')}
          </LoadingButton>

          <Typography variant="body1">
            {i18n.t('auth.noAccountQuestion')}{' '}
            <Link href="/sign-up" passHref>
              <MuiLink>{i18n.t('auth.signUp')}</MuiLink>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
