import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { User } from '../../lib/api/user';
import styles from '../../styles/pages/leaderboard.module.css';
import Polypoints from '../Polypoints';

type Props = {
  user: User;
  classOverride?: string;
  userRow?: boolean;
};

export default function PlayerRow({ user, classOverride, userRow }: Props) {
  const theme = useTheme();
  /* eslint-disable no-nested-ternary */
  const rankColor =
    user.rank === 1
      ? '#FFD700' // gold
      : user.rank === 2
      ? '#C0C0C0' // silver
      : user.rank === 3
      ? '#CD7F32' // bronze
      : 'inherit';

  return (
    <Stack
      direction="row"
      className={`${styles.playerRow} ${classOverride}`}
      style={{
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        color: userRow
          ? theme.palette.primary.main
          : theme.palette.text.primary,
      }}
      sx={{ minWidth: { xs: '75vw', sm: '400px', md: '550px' } }}
    >
      <Box className={styles.rankBox}>
        <Typography color={rankColor}>{`#${user.rank}`}</Typography>
      </Box>

      <Box className={styles.userBox}>
        <Typography color="inherit">{user.username}</Typography>
      </Box>
      <Box className={styles.pointsBox}>
        <Polypoints color="inherit" points={user.points} size="normal" />
      </Box>
    </Stack>
  );
}

PlayerRow.defaultProps = {
  classOverride: '',
  userRow: false,
};
