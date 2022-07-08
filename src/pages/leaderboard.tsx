import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import styles from '../styles/pages/leaderboard.module.css';
import { useTranslation } from '../lib/translations';
import { User } from '../lib/api/user';
import PlayerRow from '../components/leaderboard/PlayerRow';

export default function Leaderboard() {
  const users: User[] = [
    {
      id: '1',
      username: 'John Doe',
      description: 'John Doe is a cool person',
      rank: 1,
      points: 30000,
    },
    {
      id: '1',
      username: 'John Dash',
      description: 'John Dash is a cool person',
      rank: 2,
      points: 24000,
    },
    {
      id: '1',
      username: 'John Milk',
      description: 'John Milk is a cool person',
      rank: 3,
      points: 23000,
    },
    {
      id: '1',
      username: 'John Milk',
      description: 'John Milk is a cool person',
      rank: 4,
      points: 21000,
    },
    {
      id: '1',
      username: 'John Ghetta',
      description: 'John Ghetta is a cool person',
      rank: 5,
      points: 20000,
    },
    {
      id: '1',
      username: 'John John',
      description: 'John John is a cool person',
      rank: 6,
      points: 19000,
    },
    {
      id: '1',
      username: 'John John',
      description: 'John John is a cool person',
      rank: 7,
      points: 19000,
    },
    {
      id: '1',
      username: 'John John',
      description: 'John John is a cool person',
      rank: 8,
      points: 19000,
    },
  ];

  const theme = useTheme();
  const { i18n } = useTranslation();
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
        {users.length > 0 &&
          users.map((user) => <PlayerRow key={user.rank} user={user} />)}
      </Stack>
      <PlayerRow user={users[0]} classOverride={styles.userRow} userRow />
    </Box>
  );
}
