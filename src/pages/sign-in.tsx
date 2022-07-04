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
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from '../lib/translations';

import styles from '../styles/pages/SignIn&SignUp.module.css';
import polybunny from '../images/polybunny-do.png';
import { useLoginContext } from '../lib/loginContext';
import { toastError } from '../components/base/toast/Toast';
import { login, InvalidCredentialsError } from '../lib/api/api';

export default function SignIn() {
  const { user, credentialsManager } = useLoginContext();

  const theme = useTheme();

  const { i18n } = useTranslation();

  // import Next router
  const router = useRouter();

  // form state

  const [state, setState] = useState({ email: '', password: '' });

  // progress indicator
  const [loading, setLoading] = useState(false);

  // if the user is logged in, redirect to the home page

  if (user) router.push('/');

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

    login(state.email, state.password, credentialsManager)
      .then(() => {
        // redirect to the last page
        router.back();
      })
      .catch((reason) => {
        // handle error
        if (reason === InvalidCredentialsError) {
          toastError(
            <Typography>{i18n.t('signIn.invalidCredentials')}</Typography>
          );
        } else {
          toastError(
            <Typography>{i18n.t('signIn.unexpectedError')}</Typography>
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.logo}>
        <Image src={polybunny} />
      </Box>

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className={styles.divider}
      />

      <Box className={styles.form}>
        <form className={styles.loginForm}>
          <Typography variant="h4">
            <span style={{ color: theme.palette.primary.main }}>Poly</span>
            Code
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
            type="submit"
          >
            {i18n.t('auth.signIn')}
          </LoadingButton>

          <Typography variant="body1">
            {i18n.t('auth.noAccountQuestion')}{' '}
            <Link href="/sign-up" passHref>
              <MuiLink>{i18n.t('auth.signUp')}</MuiLink>
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
}
