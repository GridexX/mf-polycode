import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from '../styles/pages/leaderboard.module.css';
import { useTranslation } from '../lib/translations';
import PlayerRow from '../components/leaderboard/PlayerRow';
import { useLoginContext } from '../lib/loginContext';
import ContextualMenuLeaderboard from '../components/team/ContextualMenuLeaderboard';
import { getUsers, User } from '../lib/api/user';
import { toastError } from '../components/base/toast/Toast';
import CenteredLoader from '../components/base/CenteredLoader';

export default function Leaderboard() {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const { credentialsManager, user } = useLoginContext();
  const [users, setUsers] = React.useState<User[]>([]);
  const [fetchLoading, setFetchLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (user) {
      setFetchLoading(true);
      getUsers(credentialsManager)
        .then((fetchedUsers) =>
          setUsers(fetchedUsers.data.sort((a, b) => b.points - a.points))
        )
        .catch(() =>
          toastError(
            <Typography>{i18n.t('pages.leaderboard.fetchError')}</Typography>
          )
        )
        .finally(() => setFetchLoading(false));
    }
  }, [credentialsManager, i18n, user]);

  return (
    <Box className={styles.innerContainer}>
      <Typography
        variant="h3"
        color={theme.palette.text.primary}
        className={styles.title}
      >
        {i18n.t('pages.leaderboard.title')}
      </Typography>
      <Stack direction="column" spacing={6}>
        {fetchLoading && <CenteredLoader />}
        {users &&
          users.length > 0 &&
          users.map((member, index) => (
            <PlayerRow id={index + 1} key={member.id} user={member}>
              <ContextualMenuLeaderboard member={member} />
            </PlayerRow>
          ))}
        {!users &&
          [0, 1, 2].map((index) => (
            <PlayerRow key={index + 1} user={undefined}>
              <ContextualMenuLeaderboard />
            </PlayerRow>
          ))}
      </Stack>
      {user && <PlayerRow user={user} classOverride={styles.userRow} userRow />}
    </Box>
  );
}
