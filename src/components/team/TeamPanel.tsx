import React from 'react';
import { Box, useTheme, Typography, Stack } from '@mui/material';
import { Team } from '../../lib/api/team';
import { useTranslation } from '../../lib/translations';
import styles from '../../styles/components/account/Settings.module.css';
import UserRow from '../base/UserRow';
import ContextualMenuAdmin from './ContextualMenuAdmin';
import ContextualMenuUser from './ContextualMenuUser';
import { useLoginContext } from '../../lib/loginContext';
import useCaptain from './useCaptain';

type Props = {
  team: Team | undefined;
};

export default function TeamPanel({ team }: Props) {
  // TODO: Add logic to determine if user is captain of the team

  const { i18n } = useTranslation();
  const theme = useTheme();
  const { user } = useLoginContext();
  const isCaptain = useCaptain(team);

  return (
    <Box className={styles.container}>
      {/* panel title */}
      <Box className={styles.titleContainer}>
        <Typography variant="h3" color={theme.palette.text.primary}>
          {i18n.t('components.team.teamPanel.title')}
        </Typography>
      </Box>
      <Box className={styles.formContainer}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography variant="h4" color={theme.palette.text.primary}>
            {i18n.t('components.team.teamPanel.members')}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={4} sx={{ mt: 6 }}>
          {team?.members &&
            team?.members?.map((member, index) => (
              <UserRow
                userRow={user?.id === member.id}
                id={index + 1}
                key={member.id}
                user={member}
              >
                {/** Display the correct menu */}
                {user?.id === member.id && (
                  <ContextualMenuUser userId={member.id} />
                )}
                {isCaptain && user?.id !== member.id && (
                  <ContextualMenuAdmin team={team} user={member} />
                )}
                {!isCaptain && user?.id !== member.id && (
                  <ContextualMenuUser userId={member.id} />
                )}
              </UserRow>
            ))}
          {!team &&
            [0, 2, 3].map((index) => (
              <UserRow id={index + 1} key={index} user={undefined}>
                <ContextualMenuUser userId="" />
              </UserRow>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
