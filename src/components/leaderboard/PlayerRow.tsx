import {
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { User } from '../../lib/api/user';
import styles from '../../styles/components/leaderboard/PlayerRow.module.css';
import Polypoints from '../Polypoints';
import ContextualMenu from '../base/ContextualMenu';

type Props = {
  children?: React.ReactNode;
  user?: User;
  rank?: number;
  classOverride?: string;
  userRow?: boolean;
};

export default function PlayerRow({
  children,
  user,
  rank,
  classOverride,
  userRow = false,
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
    rank === 1
      ? '#FFD700' // gold
      : rank === 2
      ? '#C0C0C0' // silver
      : rank === 3
      ? '#CD7F32' // bronze
      : 'inherit';

  return (
    <Stack
      direction="row"
      className={`${styles.container} ${classOverride}`}
      style={{
        borderColor: userRow ? theme.palette.primary.main : 'inherit',
      }}
    >
      <Typography color={rankColor} className={styles.column}>
        {rank ? `#${rank}` : '???'}
      </Typography>
      <Typography color="inherit" className={styles.column}>
        {user?.username ?? <Skeleton width={100} />}
      </Typography>

      <Stack direction="row" spacing={2} className={styles.column}>
        <Polypoints color="inherit" points={user?.points} size="normal" />

        {!user && <Skeleton width={100} />}
        {children ? (
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
        ) : (
          <div />
        )}
      </Stack>
    </Stack>
  );
}

PlayerRow.defaultProps = {
  classOverride: '',
  userRow: false,
};
