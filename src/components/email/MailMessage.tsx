import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { resendEmail, UserEmail } from '../../lib/api/user';
import { useTranslation } from '../../lib/translations';
import { toastError, toastSuccess } from '../base/toast/Toast';

import styles from '../../styles/components/email/MailMessage.module.css';

interface VerificationMessageProps {
  email: UserEmail;
}

export default function MailMessage({ email }: VerificationMessageProps) {
  const { i18n } = useTranslation();

  const handleResendEmail = () => {
    resendEmail(email.id)
      .then(() => {
        toastSuccess(
          <Typography>
            {i18n.t('components.email.resendSuccess')}
          </Typography>
        );
      })
      .catch(() => {
        toastError(
          <Typography>
            {i18n.t('components.email.resendError')}
          </Typography>
        );
      });
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h6" component="h2">
        {i18n.t('components.email.title')}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        {i18n.t('components.email.sentMail')} {email.email}{' '}
        {i18n.t('components.email.sentMailSuite')}
      </Typography>
      <Typography className={styles.question}>
        {i18n.t('components.email.didNotReceive')}
      </Typography>
      <Button
        className={styles.resend}
        variant="contained"
        onClick={handleResendEmail}
      >
        {i18n.t('components.email.resend')}
      </Button>
    </Box>
  );
}
