import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from '../../styles/pages/leaderboard.module.css';
import Polypoints from '../Polypoints';
import ContextualMenu from './ContextualMenu';
import { TeamMember } from '../../lib/api/team';

type Props = {
  children: React.ReactNode;
  id: number;
  user?: TeamMember;
  classOverride?: string;
  userRow?: boolean;
};

export default function UserRow({
  children,
  id,
  user,
  classOverride,
  userRow,
}: Props) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = React.useState(false);
  const [target, setTarget] = React.useState<Element | null>(null);
  const [rankColor, setRankcolor] = React.useState('inherit');
  useEffect(() => {
    if (id) {
      setRankcolor(
        /* eslint-disable no-nested-ternary */
        id === 1
          ? '#FFD700' // gold
          : id === 2
          ? '#C0C0C0' // silver
          : id === 3
          ? '#CD7F32' // bronze
          : 'inherit'
      );
    }
  }, [rankColor, id]);

  const handleClick = (event: any) => {
    setTarget(event.currentTarget);
    setIsOpen(true);
  };

  return (
    <Stack
      direction="row"
      className={`${styles.playerRow} ${classOverride}`}
      style={{
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.primary.main,
        color: userRow
          ? theme.palette.primary.main
          : theme.palette.text.primary,
      }}
      sx={{ minWidth: { xs: '75vw', sm: '400px', md: '550px' } }}
    >
      <Box className={styles.rankBox}>
        {id && user && <Typography color={rankColor}>{`#${id}`}</Typography>}
        {!id && !user && <Skeleton width={100} />}
      </Box>

      <Box className={styles.userBox}>
        <Typography color="inherit">
          {user?.username ?? <Skeleton width={100} />}
        </Typography>
      </Box>
      <Stack direction="row" spacing={2} className={styles.pointsBox}>
        {typeof user?.points !== 'undefined' && (
          <Polypoints points={user.points} size="normal" />
        )}
        {typeof user?.points === 'undefined' && <Skeleton width={100} />}
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

UserRow.defaultProps = {
  classOverride: '',
  userRow: false,
};
