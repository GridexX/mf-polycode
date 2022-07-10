import React from 'react';
import { Box, Typography, useTheme, Stack, Button } from '@mui/material';
import Link from 'next/link';

import styles from '../../styles/components/account/Teams.module.css';
import { useTranslation } from '../../lib/translations';
import { Team } from '../../lib/api/team';
import TeamRowGeneric from '../team/TeamRowGeneric';
import { useLoginContext } from '../../lib/loginContext';
import { toastError } from '../base/toast/Toast';
import { useGetUserTeams } from '../../lib/api/user';

export default function TeamsPanel() {
  // import mui theme
  const theme = useTheme();
  const { i18n } = useTranslation();
  const { credentialsManager, user } = useLoginContext();
  const [teamsCaptainOf, setTeamsCaptainOf] = React.useState<Team[]>([]);
  const [teamsMemberOf, setTeamsMemberOf] = React.useState<Team[]>([]);
  const teamsFetchResponse = useGetUserTeams(credentialsManager, '@me');

  React.useEffect(() => {
    if (teamsFetchResponse.data && user) {
      setTeamsCaptainOf(
        teamsFetchResponse.data.filter((team) =>
          team.members.some(
            (teamMember) =>
              teamMember.role === 'captain' && teamMember.id === user.id
          )
        )
      );
      setTeamsMemberOf(
        teamsFetchResponse.data.filter((team) =>
          team.members.some(
            (teamMember) =>
              teamMember.role === 'member' && teamMember.id === user.id
          )
        )
      );
    }
    if (teamsFetchResponse.error) {
      toastError(
        <Typography>{i18n.t('components.account.teams.fetchError')}</Typography>
      );
    }
  }, [i18n, teamsFetchResponse, user]);

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
        <Box className={styles.memberOf}>
          <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
            {i18n.t('components.account.teams.captainOf')}
          </Typography>
          <Stack className={styles.teamsList} spacing={4}>
            {teamsCaptainOf && teamsCaptainOf.length === 0 && (
              <Typography
                className={styles.noData}
                variant="body1"
                sx={{ color: theme.palette.text.primary }}
              >
                {i18n.t('components.account.teams.notCaptainOf')}
              </Typography>
            )}
            {teamsCaptainOf &&
              teamsCaptainOf.length > 0 &&
              teamsCaptainOf.map((team: Team) => (
                <TeamRowGeneric key={team.id} team={team} />
              ))}
            {!teamsCaptainOf &&
              [0, 1, 2].map((index) => (
                <TeamRowGeneric key={index + 1} team={undefined} />
              ))}
          </Stack>
        </Box>
        {/* Member of */}
        <Box className={styles.memberOf}>
          <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
            {i18n.t('components.account.teams.memberOf')}
          </Typography>
          <Stack className={styles.teamsList} spacing={4}>
            {teamsMemberOf && teamsMemberOf.length === 0 && (
              <Typography
                className={styles.noData}
                variant="body1"
                sx={{ color: theme.palette.text.primary }}
              >
                {i18n.t('components.account.teams.notMemberOf')}
              </Typography>
            )}
            {teamsMemberOf &&
              teamsMemberOf.length > 0 &&
              teamsMemberOf.map((team: Team) => (
                <TeamRowGeneric showCaptainIcon key={team.id} team={team} />
              ))}
            {!teamsMemberOf &&
              [0, 1, 2].map((index) => (
                <TeamRowGeneric key={index + 1} team={undefined} />
              ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Link href="/team">
              <Button variant="contained">
                {i18n.t('components.account.teams.seeAll')}
              </Button>
            </Link>
            <Link href="/team/create">
              <Button>{i18n.t('components.account.teams.create')}</Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
