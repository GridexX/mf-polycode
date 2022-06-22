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
        description: 'John Doe is a cool guy',
        rank: 1,
        points: 30000,
      },
      {
        id: '2',
        username: 'John Dash',
        description: 'John Dash is a cool guy',
        rank: 2,
        points: 3000,
      },
    ],
    captain: {
      id: '1',
      username: 'John Doe',
      description: 'John Doe is a cool guy',
      rank: 1,
      points: 30000,
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