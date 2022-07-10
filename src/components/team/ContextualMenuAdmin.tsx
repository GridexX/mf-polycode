import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CampaignIcon from '@mui/icons-material/Campaign';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from '../../lib/translations';
import { TeamMember, Team } from '../../lib/api/team';
import ModalDeleteUser from './ModalDeleteUser';

type Props = {
  team: Team;
  user: TeamMember;
};

export default function ContextualMenuAdmin({ team, user }: Props) {
  const theme = useTheme();
  const { i18n } = useTranslation();

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Stack spacing={1} direction="column" alignItems="flex-start">
      <Link href={`/account/${user.id}`}>
        <Button>
          <Stack spacing={1} direction="row" color={theme.palette.text.primary}>
            <InfoIcon />
            <Typography variant="body1">
              {i18n.t('components.team.contextualMenu.info')}
            </Typography>
          </Stack>
        </Button>
      </Link>
      <Button>
        <Stack spacing={1} direction="row" color={theme.palette.text.primary}>
          <CampaignIcon />
          <Typography variant="body1">
            {i18n.t('components.team.contextualMenu.edit')}
          </Typography>
        </Stack>
      </Button>
      <Button onClick={() => setOpenModal(true)}>
        <Stack spacing={1} direction="row" color={theme.palette.error.main}>
          <DeleteIcon />
          <Typography variant="body1">
            {i18n.t('components.team.contextualMenu.delete')}
          </Typography>
        </Stack>
      </Button>
      <ModalDeleteUser
        teamId={team.id}
        userId={user.id}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </Stack>
  );
}
