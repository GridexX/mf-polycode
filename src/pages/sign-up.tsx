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
import { LoadingButton } from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';

import styles from '../styles/pages/SignUp.module.css';
import polybunny from '../../public/images/polybunny-do.png';

export default function SignIn() {
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
          confirmPassword: 'Passwords don’t match',
        }));
    } else setFormErrorsState((previous) => ({ ...previous, confirmPassword: '' }));
  };

  // check password on state change

  useEffect(checkConfirmPassword, [
    formState.password,
    formState.confirmPassword,
    formErrorsState.confirmPassword.length,
  ]);

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

  const handleLogin = () => {
    let error = false;

    Object.values(formErrorsState).forEach((value) => {
      if (value.length > 0) error = true;
    });

    if (error) {
      // TODO: display notification
      return;
    }

    if (!formState.acceptTos) {
      // TODO: display notification
      return;
    }

    if (!formState.overThirteen) {
      // TODO: display notification
      return;
    }

    if (formState.password.length === 0) {
      // TODO: display notification
      setFormErrorsState((previous) => ({
        ...previous,
        password: 'Password cannot be empty',
      }));

      return;
    }

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

          <FormGroup>
            <Stack spacing={2}>
              <TextField
                type="text"
                onChange={handleUsernameChange}
                label="Username"
                variant="standard"
                error={formErrorsState.username.length > 0}
                helperText={formErrorsState.username}
              />
              <TextField
                type="email"
                onChange={handleEmailChange}
                label="Email"
                variant="standard"
                error={formErrorsState.email.length > 0}
                helperText={formErrorsState.email}
              />

              <TextField
                type="password"
                onChange={handlePasswordChange}
                label="Password"
                variant="standard"
                error={formErrorsState.password.length > 0}
                helperText={formErrorsState.password}
              />

              <TextField
                type="password"
                onChange={handleConfirmPasswordChange}
                label="Confirm Password"
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
                label="I am over 13"
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
                    I have read the{' '}
                    <Link href="/tos" passHref>
                      <MuiLink>terms of service</MuiLink>
                    </Link>
                  </Typography>
                }
              />
            </Stack>
            <LoadingButton
              variant="contained"
              className={styles.loginButton}
              onClick={handleLogin}
              loading={loading}
            >
              Sign up
            </LoadingButton>

            <Typography variant="body1">
              Already have an account?{' '}
              <Link href="/sign-in" passHref>
                <MuiLink>Sign in</MuiLink>
              </Link>
            </Typography>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
