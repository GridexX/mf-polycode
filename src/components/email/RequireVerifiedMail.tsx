import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { UserEmail, getUserEmails } from '../../lib/api/user';
import { useLoginContext } from '../../lib/loginContext';
import MailMessage from './MailMessage';

interface RequireVerifiedMailProps {
  children: ReactJSXElement;
}

const excludedPaths = ['/sign-in', '/sign-up', '/email/verification/[code]'];

// Check if email is verified, if not show a message to the user with the option to resend the verification email
// Some pages are excluded from the check, see excludedPaths constant
export default function RequireVerifiedMail({
  children,
}: RequireVerifiedMailProps) {
  const { user, credentialsManager } = useLoginContext();
  const router = useRouter();

  const [emails, setEmails] = useState<UserEmail[]>([]);

  useEffect(() => {
    if (user)
      getUserEmails(credentialsManager, user.id)
        .then((v) => setEmails(v))
        // not important so no error displayed
        .catch(() => {
          setEmails([]);
        });
    else {
      setEmails([]);
    }
  }, [credentialsManager, user]);

  // cache the result of the check because otherwise it would be called every render
  const isEmailVerified = useMemo(() => {
    if (emails.length > 0 && excludedPaths.indexOf(router.pathname) === -1) {
      const email = emails[0];

      return email.isVerified;
    }

    // return true when loading or excluded
    return true;
  }, [emails, router.pathname]);

  // excluded paths
  if (excludedPaths.includes(router.pathname)) return children;

  // when loading email info
  if (user && emails.length === 0) return <CircularProgress />;

  if (!isEmailVerified) return <MailMessage email={emails[0]} />;

  return children;
}
