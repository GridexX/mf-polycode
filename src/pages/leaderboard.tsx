import { Divider, Pagination, Stack, Typography } from '@mui/material';
import React from 'react';
import Head from 'next/head';
import styles from '../styles/pages/leaderboard.module.css';
import { useTranslation } from '../lib/translations';
import PlayerRow from '../components/leaderboard/PlayerRow';
import { useLoginContext } from '../lib/loginContext';
import ContextualMenuLeaderboard from '../components/team/ContextualMenuLeaderboard';
import { getUsers, User } from '../lib/api/user';
import { toastError } from '../components/base/toast/Toast';
import CenteredLoader from '../components/base/CenteredLoader';
import { usePagination } from '../lib/api/pagination';

export default function Leaderboard() {
  const { i18n } = useTranslation();
  const { credentialsManager, user } = useLoginContext();
  const [users, setUsers] = React.useState<User[]>([]);
  const [fetchLoading, setFetchLoading] = React.useState<boolean>(true);
  const { page, total, limit, setPage, setTotal, setLimit } = usePagination(1);

  // --- handlers ---

  const handleFetchPage = React.useCallback(
    (value: number) => {
      setFetchLoading(true);
      getUsers(credentialsManager, { orderBy: { points: 'desc' }, page: value })
        .then((fetchedUsers) => {
          setLimit(fetchedUsers.limit);
          setTotal(fetchedUsers.total);
          setUsers(fetchedUsers.data);
        })
        .catch(() =>
          toastError(
            <Typography>{i18n.t('pages.leaderboard.fetchError')}</Typography>
          )
        )
        .finally(() => {
          setFetchLoading(false);
          setPage(value);
        });
    },
    [credentialsManager, i18n, setLimit, setPage, setTotal]
  );

  // --- effects ---
  React.useEffect(() => {
    if (user) {
      handleFetchPage(1);
    }
  }, [credentialsManager, handleFetchPage, i18n, user]);

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
          {users &&
            users.length > 0 &&
            users.map((member, index) => (
              <PlayerRow
                rank={(page - 1) * limit + index + 1}
                key={member.id}
                user={member}
              >
                <ContextualMenuLeaderboard member={member} />
              </PlayerRow>
            ))}
          {!users &&
            [0, 1, 2].map((index) => (
              <PlayerRow key={(page - 1) * limit + index + 1} user={undefined}>
                <ContextualMenuLeaderboard />
              </PlayerRow>
            ))}
        </Stack>
        <Divider flexItem />
        <Stack
          className={styles.staticRow}
          spacing={2}
          style={{ marginBottom: '2rem' }}
        >
          {user && <PlayerRow user={user} rank={user.rank} userRow />}
          <Pagination
            count={Math.ceil(limit > 0 ? total / limit : 1)}
            page={page}
            onChange={(_event: React.ChangeEvent<unknown>, value: number) =>
              handleFetchPage(value)
            }
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Stack>
    </>
  );
}
