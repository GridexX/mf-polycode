import React from 'react';
import { Stack, Box, useTheme, Typography } from '@mui/material';
import { useTranslation } from '../../lib/translations';
import styles from '../../styles/components/account/Menu.module.css';
import stylesTeam from '../../styles/components/team/Menu.module.css';
import MenuRow from './MenuRow';
import { Team } from '../../lib/api/team';

type Props = {
  team: Team;
};

export default function Menu({ team }: Props) {
  const { i18n } = useTranslation();

  const theme = useTheme();

  return (
    <Box className={styles.container}>
      <Box className={stylesTeam.innerContainer}>
        <Box sx={{ textAlign: 'center', mt: '0px', mb: '10em' }}>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary.main, width: '100%' }}
          >
            {team.name}
          </Typography>
        </Box>
        <Box
          sx={{ color: theme.palette.text.primary }}
          className={styles.navigationButtons}
        >
          <Stack
            direction="column"
            spacing={3}
            sx={{ color: theme.palette.primary.main }}
          >
            <MenuRow
              label={i18n.t('team.menu.polypoints')}
              value={team.points.toString()}
              image="/images/carrot.png"
            />
            <MenuRow
              label={i18n.t('team.menu.rank')}
              value={team.rank.toString()}
              image="/images/rank.png"
            />
            <MenuRow
              label={i18n.t('team.menu.members')}
              value={team.members.length.toString()}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
