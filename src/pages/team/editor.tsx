import React from 'react';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/team/Menu';

import styles from '../../styles/pages/account/common.module.css';
import TeamEditPanel from '../../components/team/TeamEditPanel';
import { Team } from '../../lib/api/team';

export default function TeamEditor() {
  const team: Team = {
    id: '1',
    name: 'Polycode-DO',
    description: 'Hello World from Polycode-DO team',
    rank: 1,
    points: 30000,
    members: [
      {
        id: '1',
        username: 'John Doe',
        rank: 1,
        points: 30000,
        emails: [{ id: '1', email: 'john@doe.com', isVerified: false }],
      },
      {
        id: '2',
        username: 'John Dash',
        rank: 2,
        points: 3000,
        emails: [{ id: '2', email: 'john@dash.com', isVerified: false }],
      },
    ],
    captain: {
      id: '1',
      username: 'John Doe',
      rank: 1,
      points: 30000,
      emails: [{ id: '1', email: 'john@doe.com', isVerified: false }],
    },
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <Menu team={team} />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <TeamEditPanel />
      </Box>
    </Box>
  );
}
