import { useRouter } from 'next/router';
import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

import Menu from '../../../components/team/Menu';

import styles from '../../../styles/pages/account/common.module.css';
import TeamEditionPanel from '../../../components/team/TeamEditionPanel';
import { useLoginContext } from '../../../lib/loginContext';
import { defaultTeam, getTeam, Team } from '../../../lib/api/team';
import { toastError } from '../../../components/base/toast/Toast';
import { useTranslation } from '../../../lib/translations';

export default function EditTeam() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { id } = router.query;
  const { credentialsManager } = useLoginContext();
  const [team, setTeam] = React.useState<Team>(defaultTeam);

  React.useEffect(() => {
    if (id && !Array.isArray(id)) {
      getTeam(credentialsManager, id)
        .then(setTeam)
        .catch(() =>
          toastError(
            <Typography>{i18n.t('pages.team.edit.fetchError')}</Typography>
          )
        );
    }
  }, [credentialsManager, i18n, id]);

  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <Menu team={team} state="editor" />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <TeamEditionPanel team={team} />
      </Box>
    </Box>
  );
}
