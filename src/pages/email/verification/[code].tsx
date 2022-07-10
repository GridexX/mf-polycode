import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { validateEmail } from '../../../lib/api/user';
import { useTranslation } from '../../../lib/translations';
import { useLoginContext } from '../../../lib/loginContext';

import styles from '../../../styles/pages/email/verification/EmailVerification.module.css';

export default function EmailVerification() {
  const router = useRouter();
  const { code } = router.query;
  const { user } = useLoginContext();

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (code) {
      setIsLoading(true);
      validateEmail(`${code}`)
        .then(() => setIsVerified(true))
        .catch(() => setIsVerified(false))
        .finally(() => setIsLoading(false));
    }
  }, [code]);

  return (
    <>
      <Head>
        <title>{i18n.t('pages.email.verification.title')}</title>
      </Head>
      <Box className={styles.container}>
        {isLoading ? (
          <Typography>{i18n.t('pages.email.verification.progress')}</Typography>
        ) : (
          <Box>
            {isVerified ? (
              <Typography>
                {i18n.t('pages.email.verification.success')}
              </Typography>
            ) : (
              <Typography>
                {i18n.t('pages.email.verification.failed')}
              </Typography>
            )}

            {user ? (
              <Link href="/" passHref>
                <Button variant="contained" className={styles.button}>
                  {i18n.t('pages.email.verification.home')}
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in" passHref>
                <Button variant="contained" className={styles.button}>
                  {i18n.t('pages.email.verification.signIn')}
                </Button>
              </Link>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
