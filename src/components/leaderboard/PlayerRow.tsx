import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { User } from '../../lib/api/user';
import styles from '../../styles/pages/leaderboard.module.css';
import Polypoints from '../Polypoints';
import ContextualMenu from '../base/ContextualMenu';

type Props = {
  children?: React.ReactNode;
  user?: User;
  id?: number;
  classOverride?: string;
  userRow?: boolean;
};

export default function PlayerRow({
  children,
  id,
  user,
  classOverride,
  userRow,
}: Props) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = React.useState(false);
  const [target, setTarget] = React.useState<Element | null>(null);

  const handleClick = (event: any) => {
    setTarget(event.currentTarget);
    setIsOpen(true);
  };

  /* eslint-disable no-nested-ternary */
  const rankColor =
    id === 1
      ? '#FFD700' // gold
      : id === 2
      ? '#C0C0C0' // silver
      : id === 3
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
        <Typography color={rankColor}>{id ? `#${id}` : '???'}</Typography>
      </Box>

      <Box className={styles.userBox}>
        <Typography color="inherit">
          {user?.username ?? <Skeleton width={100} />}
        </Typography>
      </Box>
      <Stack direction="row" spacing={2} className={styles.pointsBox}>
        <Polypoints color="inherit" points={user?.points} size="normal" />

        {!user && <Skeleton width={100} />}
        {children && (
          <>
            {user ? (
              <IconButton size="medium" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            ) : (
              <Skeleton variant="circular" width={30} height={30} />
            )}

            <ContextualMenu
              target={target}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              direction="right"
            >
              {children}
            </ContextualMenu>
          </>
        )}
      </Stack>
    </Stack>
  );
}

PlayerRow.defaultProps = {
  classOverride: '',
  userRow: false,
};
