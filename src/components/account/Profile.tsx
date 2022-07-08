/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from '../../lib/translations';

import styles from '../../styles/components/account/Profile.module.css';
import rankImage from '../../images/rank.png';
import carrotImage from '../../images/carrot.png';
import { useLoginContext } from '../../lib/loginContext';
import { getUserEmails, getUserSettings, UserEmail } from '../../lib/api/user';
import { toastError } from '../base/toast/Toast';
import CenteredLoader from '../base/CenteredLoader';

export interface ProfileState {
  username: string;
  emails: string[];
  preferredEditingLanguage: string;
  polypoints: number;
  rank: number;
  biography: string;
}

const defaultProfileState: ProfileState = {
  username: '',
  emails: [],
  preferredEditingLanguage: '',
  polypoints: 0,
  rank: 0,
  biography: '',
};

export default function Profile() {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const { user, credentialsManager } = useLoginContext();
  const [profileState, setProfileState] = React.useState(defaultProfileState);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        getUserEmails(credentialsManager, user.id),
        getUserSettings(credentialsManager, user.id),
      ])
        .then(([userEmails, userSettings]) => {
          setProfileState({
            username: user.username,
            emails: userEmails.map((email: UserEmail) => email.email),
            preferredEditingLanguage: userSettings.preferredEditingLanguage,
            polypoints: user.points,
            rank: user.rank || 0,
            biography: user.description,
          });
        })
        .catch(() => {
          toastError(
            <Typography>
              {i18n.t('components.account.profile.serverFetchFailed')}
            </Typography>
          );
        })
        .finally(() => setLoading(false));
    }
  }, [credentialsManager, i18n, user]);

  return (
    <Box
      className={styles.container}
      sx={{ color: '#082946' }} // update with theme.palette.text.main
    >
      {/* Panel title */}
      <Box className={styles.titleContainer}>
        <Typography variant="h3" color="inherit">
          {i18n.t('components.account.profile.title')}
        </Typography>
      </Box>
      {/* Content container */}
      <Box className={styles.contentContainer}>
        {loading ? (
          <CenteredLoader />
        ) : (
          <Box>
            {/* Information */}
            <Box className={styles.sectionContainer}>
              <Typography
                className={styles.subContentTitle}
                variant="h4"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('components.account.profile.information')}
              </Typography>

              {/* Username */}
              <Box className={styles.fieldContainer}>
                <Typography
                  className={styles.fieldLabel}
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {i18n.t('components.account.profile.username')}
                </Typography>
                <Box className={styles.fieldValue}>
                  <Typography color="inherit">
                    {profileState.username}
                  </Typography>
                </Box>
              </Box>
              {/* Email */}
              <Box className={styles.fieldContainer}>
                <Typography
                  className={styles.fieldLabel}
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {i18n.t('components.account.profile.emails')}
                </Typography>
                <Box className={styles.fieldValue}>
                  {profileState.emails && profileState.emails.length > 0
                    ? profileState.emails.map((email: string) => (
                        <Typography
                          key={email}
                          className={styles.emailItem}
                          color="inherit"
                        >
                          {email}
                        </Typography>
                      ))
                    : null}
                </Box>
              </Box>
              {/* PreferedLanguage */}
              <Box className={styles.fieldContainer}>
                <Typography
                  className={styles.fieldLabel}
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {i18n.t('components.account.profile.preferredLanguage')}
                </Typography>
                <Box className={styles.fieldValue}>
                  <Typography color="inherit">
                    {profileState.preferredEditingLanguage}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Score */}
            <Box className={styles.sectionContainer}>
              <Typography
                className={styles.subContentTitle}
                variant="h4"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('components.account.profile.score')}
              </Typography>

              {/* Score content */}
              <Box className={styles.scoreContent}>
                {/* Polypoints */}
                <Box className={styles.fieldContainer}>
                  <Typography
                    className={styles.fieldLabel}
                    variant="h6"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {i18n.t('components.account.profile.polypoints')}
                  </Typography>
                  <Box className={styles.atomicContentContainer}>
                    <Typography color="inherit">
                      {profileState.polypoints}
                    </Typography>
                    <Box className={styles.scoreContentImageContainer}>
                      <Image src={carrotImage} />
                    </Box>
                  </Box>
                </Box>
                {/* Ranks */}
                <Box className={styles.fieldContainer}>
                  <Typography
                    className={styles.fieldLabel}
                    variant="h6"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {i18n.t('components.account.profile.rank')}
                  </Typography>
                  <Box className={styles.atomicContentContainer}>
                    <Typography
                      color={
                        profileState.rank === 1
                          ? '#FFD700' // gold
                          : profileState.rank === 2
                          ? '#C0C0C0' // silver
                          : profileState.rank === 3
                          ? '#CD7F32' // bronze
                          : 'inherit'
                      }
                    >
                      {profileState.rank === 0
                        ? i18n.t('components.account.profile.unknownRank')
                        : `#${profileState.rank}`}
                    </Typography>
                    <Box className={styles.scoreContentImageContainer}>
                      <Image src={rankImage} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Biography */}
            <Box className={styles.sectionContainer}>
              <Typography
                className={styles.subContentTitle}
                variant="h4"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('components.account.profile.biography')}
              </Typography>

              {/* Bio content */}
              <Box className={styles.biographyContent}>
                <Typography color="inherit">
                  {profileState.biography.length > 0
                    ? profileState.biography
                    : i18n.t('components.account.profile.noBiography')}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
