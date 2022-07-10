import {
  Box,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { LocalPolice, MoreVert } from '@mui/icons-material';
import React from 'react';
import { Team } from '../../lib/api/team';

import styles from '../../styles/components/account/Teams.module.css';
import Polypoints from '../Polypoints';

type Props = {
  team?: Team;
  showCaptainIcon?: boolean;
};

// Retrieve if the user is connected and show an icon if he is the captain

export default function TeamRowGeneric({ team, showCaptainIcon }: Props) {
  const theme = useTheme();

  return (
    <Link href={`/team/${team?.id}`}>
      <Box
        className={styles.teamContainer}
        style={{ borderColor: theme.palette.primary.main }}
      >
        <Stack direction="row" className={styles.teamInnerLeft} spacing={2}>
          <Typography
            className={styles.teamName}
            variant="h6"
            sx={{ color: theme.palette.text.primary }}
          >
            {team?.name ?? <Skeleton width={150} />}
          </Typography>
          {showCaptainIcon && (
            <>
              <Divider orientation="vertical" flexItem />
              <Stack direction="row" className={styles.captain} spacing={2}>
                <LocalPolice sx={{ fill: theme.palette.primary.main }} />
                <Typography variant="h6">
                  {team?.members.find((member) => member.role === 'captain')
                    ?.username ?? <Skeleton width={100} />}
                </Typography>
              </Stack>
            </>
          )}
        </Stack>
        <Stack direction="row" className={styles.teamInnerRight} spacing={2}>
          <Polypoints points={team?.points} />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <MoreVert />
          </IconButton>
        </Stack>
      </Box>
    </Link>
  );
}
