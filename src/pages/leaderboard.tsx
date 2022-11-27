import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import Head from 'next/head';
import styles from '../styles/pages/leaderboard.module.css';
import { useTranslation } from '../lib/translations';
import { useLoginContext } from '../lib/loginContext';
import ContextualMenuLeaderboard from '../components/team/ContextualMenuLeaderboard';
import { getUsers, User } from '../lib/api/user';
import { toastError } from '../components/base/toast/Toast';
import CenteredLoader from '../components/base/CenteredLoader';
import { defaultPaginatedResponse, Paginator } from '../lib/pagination';
import UserRow from '../components/base/UserRow';

export default function Leaderboard() {
  const { i18n } = useTranslation();
  const { credentialsManager, user } = useLoginContext();
  const [users, setUsers] = React.useState<User[]>([]);
  const [fetchLoading, setFetchLoading] = React.useState<boolean>(true);
  const [pageRank, setPageRank] = React.useState<number>(0);

  const request = React.useCallback(
    async (page: number, limit: number) => {
      if (user) {
        setPageRank((page - 1) * limit);
        setFetchLoading(true);
        return getUsers(credentialsManager, {
          orderBy: { points: 'desc' },
          page,
        });
      }
      return Promise.resolve(defaultPaginatedResponse);
    },
    [credentialsManager, user]
  );
  const handleFetchError = React.useCallback(
    () => toastError(i18n.t('pages.leaderboard.fetchError')),
    [i18n]
  );
  const handleFetchDone = React.useCallback(() => setFetchLoading(false), []);

  // --- render ---

  return (
    <>
      <Head>
        <title>{i18n.t('pages.leaderboard.title')}</title>
      </Head>
      <Stack className={styles.innerContainer} spacing={6}>
        <Typography
          variant="h3"
          component="span"
          color="text.primary"
          className={styles.title}
        >
          {i18n.t('pages.leaderboard.title')}
        </Typography>
        <Stack direction="column" spacing={4} className={styles.userList}>
          {fetchLoading && <CenteredLoader />}
          {!fetchLoading && users.length === 0 && (
            <Typography>{i18n.t('pages.leaderboard.noUsers')}</Typography>
          )}
          {!fetchLoading &&
            users.length > 0 &&
            users.map((member, index) => (
              <UserRow
                user={member}
                rank={pageRank + index + 1}
                isMe={member.id === user?.id}
                contextualMenuContent={
                  <ContextualMenuLeaderboard member={member} />
                }
                key={member.id}
              />
            ))}
        </Stack>
        <Divider flexItem />
        <Stack
          className={styles.staticRow}
          spacing={2}
          style={{ marginBottom: '2rem' }}
        >
          {user && <UserRow user={user} rank={user.rank} isMe />}
          <Paginator
            request={request}
            onChange={setUsers}
            onError={handleFetchError}
            onDone={handleFetchDone}
            props={{ color: 'primary', variant: 'outlined', shape: 'rounded' }}
          />
        </Stack>
      </Stack>
    </>
  );
}
