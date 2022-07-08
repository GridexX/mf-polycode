import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import { LocalPolice, MoreVert } from '@mui/icons-material';

import styles from '../../styles/components/account/Teams.module.css';
import { useTranslation } from '../../lib/translations';
import { Team } from '../../lib/api/team';
import { useLoginContext } from '../../lib/loginContext';
import Polypoints from '../Polypoints';
import CenteredLoader from '../base/CenteredLoader';

const fakeData: Team[] = [
  {
    id: '1',
    name: 'DO_2021_2022fzefzefezfezfezfzefhziufheizfiuezuifheizhifhiezuifhuie',
    description: 'DO 2021-2022 team',
    captain: {
      id: '1',
      username: 'John Doe',
      description: 'John Doe is a great player',
      points: 20000,
    },
    points: 24000,
    members: [],
    rank: 1,
  },
  {
    id: '2',
    name: 'LesBestGamer34',
    description: 'Play with the best',
    captain: {
      id: '1',
      username: 'John Doe',
      description: 'John Doe is a great player',
      points: 20000,
    },
    points: 18250,
    members: [],
    rank: 2,
  },
  {
    id: '3',
    name: 'Les Lumières',
    description: 'We light the world',
    captain: {
      id: '1',
      username: 'John Doe',
      description: 'John Doe is a great player',
      points: 20000,
    },
    points: 9500,
    members: [],
    rank: 3,
  },
];

export default function Teams() {
  // import mui theme
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useLoginContext();

  const [teamsCaptainOf, setTeamsCaptainOf] = React.useState<Team[]>([]);
  const [teamsMemberOf, setTeamsMemberOf] = React.useState<Team[]>([]);

  // --- init data ---
  const initData = async () => {
    // Fake api call
    setLoading(true);
    setTimeout(() => {
      setTeams(fakeData);
      setLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    initData();
  }, []);

  React.useEffect(() => {
    setTeamsCaptainOf(teams.filter((team) => team.captain.id === user?.id));
    setTeamsMemberOf(teams.filter((team) => team.captain.id !== user?.id));
  }, [teams, user]);

  // --- render ---
  return (
    <Box className={styles.container}>
      {/* title */}
      <Box className={styles.titleContainer}>
        <Typography variant="h3" color="inherit">
          {i18n.t('components.account.teams.title')}
        </Typography>
      </Box>
      {/* content container */}
      <Box className={styles.contentContainer}>
        {/* Captain of */}
        <Box className={styles.captainOf}>
          <Typography
            variant="h4"
            sx={{ color: theme.palette.primary.main }}
            className={styles.teamsListTitle}
          >
            {i18n.t('components.account.teams.captainOf')}
          </Typography>

          {loading ? (
            <CenteredLoader />
          ) : (
            <Stack className={styles.teamsList} spacing={4}>
              {teamsCaptainOf.length === 0 ? (
                <Typography
                  className={styles.noData}
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {i18n.t('components.account.teams.notCaptainOf')}
                </Typography>
              ) : (
                teamsCaptainOf.map((team) => (
                  <Box className={styles.teamContainer}>
                    <Stack direction="row" className={styles.teamInnerLeft}>
                      <Typography
                        className={styles.teamName}
                        variant="h6"
                        sx={{ color: theme.palette.primary.main }}
                      >
                        {team.name}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      className={styles.teamInnerRight}
                      spacing={2}
                    >
                      <Polypoints points={team.points} />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <MoreVert />
                      </IconButton>
                    </Stack>
                  </Box>
                ))
              )}
            </Stack>
          )}
        </Box>
        {/* Member of */}
        <Box className={styles.memberOf}>
          <Typography
            variant="h4"
            sx={{ color: theme.palette.primary.main }}
            className={styles.teamsListTitle}
          >
            {i18n.t('components.account.teams.memberOf')}
          </Typography>
          {loading ? (
            <CenteredLoader />
          ) : (
            <Stack className={styles.teamsList} spacing={4}>
              {teamsMemberOf.length === 0 ? (
                <Typography
                  className={styles.noData}
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {i18n.t('components.account.teams.notMemberOf')}
                </Typography>
              ) : (
                teamsMemberOf.map((team) => (
                  <Box className={styles.teamContainer}>
                    <Stack
                      direction="row"
                      className={styles.teamInnerLeft}
                      spacing={2}
                    >
                      <Typography
                        className={styles.teamName}
                        variant="h6"
                        sx={{ color: theme.palette.primary.main }}
                      >
                        {team.name}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Stack
                        direction="row"
                        className={styles.captain}
                        spacing={2}
                      >
                        <LocalPolice
                          sx={{ fill: theme.palette.primary.main }}
                        />
                        <Typography variant="h6">
                          {team.captain.username}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      direction="row"
                      className={styles.teamInnerRight}
                      spacing={2}
                    >
                      <Polypoints points={team.points} />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <MoreVert />
                      </IconButton>
                    </Stack>
                  </Box>
                ))
              )}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
