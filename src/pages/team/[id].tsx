import { useRouter } from 'next/router';
import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Head from 'next/head';

import Menu from '../../components/team/Menu';

import styles from '../../styles/pages/account/common.module.css';
import TeamPanel from '../../components/team/TeamPanel';
import { defaultTeam, Team as ITeam, useGetTeam } from '../../lib/api/team';
import { useRequireValidUser } from '../../lib/loginContext';
import { toastError } from '../../components/base/toast/Toast';
import { useTranslation } from '../../lib/translations';

export default function Team() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { credentialsManager } = useRequireValidUser();
  const { id } = router.query;
  const [team, setTeam] = React.useState<ITeam>(defaultTeam);
  const teamFetchResponse = useGetTeam(
    credentialsManager,
    Array.isArray(id) ? id[0] : id
  );

  React.useEffect(() => {
    if (teamFetchResponse.data) {
      setTeam(teamFetchResponse.data);
    }
    if (teamFetchResponse.error) {
      toastError(<Typography>{i18n.t('pages.team.id.fetchError')}</Typography>);
    }
  }, [i18n, teamFetchResponse]);

  return (
    <>
      <Head>
        <title>{team.name}</title>
      </Head>
      <Box className={styles.container}>
        <Box className={styles.contentContainer}>
          <Menu team={team} state="view" />
          <Divider orientation="vertical" flexItem className={styles.divider} />
          <TeamPanel team={team} />
        </Box>
      </Box>
    </>
  );
}
