import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Divider,
  Link as MuiLink,
  useTheme,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from '../lib/translations';
import polybunny from '../../public/images/polybunny-do.png';
import { useLoginContext } from '../lib/loginContext';
import { createUser } from '../lib/api/user';
import { toastError } from '../components/base/toast/Toast';

import styles from '../styles/pages/SignIn&SignUp.module.css';

export default function SignIn() {
  const { user } = useLoginContext();

  const { i18n } = useTranslation();

  // import Next router
  const router = useRouter();

  // import mui theme
  const theme = useTheme();

  // form state

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    overThirteen: false,
    acceptTos: false,
  });

  // store form errors related to each input here

  const [formErrorsState, setFormErrorsState] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });

  // progress indicator
  const [loading, setLoading] = useState(false);

  const checkConfirmPassword = () => {
    if (
      formState.password.length > 0 &&
      formState.confirmPassword.length > 0 &&
      formState.confirmPassword !== formState.password
    ) {
      if (formErrorsState.confirmPassword.length === 0)
        setFormErrorsState((previous) => ({
          ...previous,
          confirmPassword: i18n.t('auth.errors.passwordsMismatch'),
        }));
    } else
      setFormErrorsState((previous) => ({ ...previous, confirmPassword: '' }));
  };

  // check password on state change

  useEffect(checkConfirmPassword, [
    formState.password,
    formState.confirmPassword,
    formErrorsState.confirmPassword.length,
    i18n,
  ]);

  // redirect to home if user is logged in

  if (user) router.push('/');

  // --- Event handlers ---

  // TODO : add checks

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // TODO : email check
    setFormState((previous) => ({ ...previous, email: event.target.value }));
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // TODO : check password security

    setFormState((previous) => ({ ...previous, password: event.target.value }));
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((previous) => ({
      ...previous,
      confirmPassword: event.target.value,
    }));
  };

  const handleUsernameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // TODO: check password availability

    setFormState((previous) => ({ ...previous, username: event.target.value }));
  };

  const handleOverThirteenChange = (event: unknown, checked: boolean) => {
    setFormState((previous) => ({
      ...previous,
      overThirteen: checked,
    }));
  };

  const handleAcceptTosChange = (event: unknown, checked: boolean) => {
    setFormState((previous) => ({
      ...previous,
      acceptTos: checked,
    }));
  };

  const handleSignUp = () => {
    let error = false;

    Object.values(formErrorsState).forEach((value) => {
      if (value.length > 0) error = true;
    });

    if (formState.password.length === 0) {
      setFormErrorsState((previous) => ({
        ...previous,
        password: i18n.t('auth.errors.passwordEmpty'),
      }));

      error = true;
    }

    if (formState.email.length === 0) {
      setFormErrorsState((previous) => ({
        ...previous,
        email: i18n.t('auth.errors.emailEmpty'),
      }));

      error = true;
    }

    if (formState.username.length === 0) {
      setFormErrorsState((previous) => ({
        ...previous,
        username: i18n.t('auth.errors.usernameEmpty'),
      }));

      error = true;
    }
    if (error) {
      toastError(
        <Typography>{i18n.t('auth.errors.errorInFields')}</Typography>
      );
      return;
    }

    if (!formState.acceptTos) {
      toastError(
        <Typography>{i18n.t('auth.errors.mustAcceptTOS')}</Typography>
      );
      return;
    }

    if (!formState.overThirteen) {
      toastError(
        <Typography>{i18n.t('auth.errors.mustBeOverThirteen')}</Typography>
      );
      return;
    }

    setLoading(true);

    createUser({
      email: formState.email,
      password: formState.password,
      username: formState.username,
    })
      .then(() => {
        router.push('/');
      })
      .catch((reason) => {
        // handle error
        toastError(
          <Typography>
            {i18n.t('auth.errors.unexpectedError')} : {JSON.stringify(reason)}
          </Typography>
        );
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
        <Box className={styles.loginForm}>
          <Typography variant="h4">
            <span style={{ color: theme.palette.primary.main }}>Poly</span>Code
          </Typography>

          <FormGroup>
            <Stack spacing={2}>
              <TextField
                type="text"
                onChange={handleUsernameChange}
                label={i18n.t('auth.username')}
                variant="standard"
                error={formErrorsState.username.length > 0}
                helperText={formErrorsState.username}
              />
              <TextField
                type="email"
                onChange={handleEmailChange}
                label={i18n.t('auth.email')}
                variant="standard"
                error={formErrorsState.email.length > 0}
                helperText={formErrorsState.email}
              />

              <TextField
                type="password"
                onChange={handlePasswordChange}
                label={i18n.t('auth.password')}
                variant="standard"
                error={formErrorsState.password.length > 0}
                helperText={formErrorsState.password}
              />

              <TextField
                type="password"
                onChange={handleConfirmPasswordChange}
                label={i18n.t('auth.confirmPassword')}
                variant="standard"
                error={formErrorsState.confirmPassword.length > 0}
                helperText={formErrorsState.confirmPassword}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleOverThirteenChange}
                    checked={formState.overThirteen}
                  />
                }
                label={i18n.t('auth.overThirteen')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleAcceptTosChange}
                    checked={formState.acceptTos}
                  />
                }
                label={
                  <Typography>
                    {i18n.t('auth.readTerms')}{' '}
                    <Link href="/tos" passHref>
                      <MuiLink>{i18n.t('auth.termsOfService')}</MuiLink>
                    </Link>
                  </Typography>
                }
              />
            </Stack>
            <LoadingButton
              variant="contained"
              className={styles.loginButton}
              onClick={handleSignUp}
              loading={loading}
            >
              {i18n.t('auth.signUp')}
            </LoadingButton>

            <Typography variant="body1">
              {i18n.t('auth.haveAccountQuestion')}{' '}
              <Link href="/sign-in" passHref>
                <MuiLink>{i18n.t('auth.signIn')}</MuiLink>
              </Link>
            </Typography>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
