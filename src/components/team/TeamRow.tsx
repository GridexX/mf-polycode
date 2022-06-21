import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Polypoints from '../Polypoints';
import TrashIcon from './TrashIcon';

type Props = {
  name: string;
  points: number;
  isCaptain?: boolean;
};

export default function TeamRow({ name, points, isCaptain }: Props) {
  const theme = useTheme();
  const color = isCaptain
    ? theme.palette.primary.main
    : theme.palette.text.primary;
  return (
    <Stack direction="row" sx={{ alignItems: 'center', color }}>
      <Typography>{name}</Typography>
      <Stack
        direction="row"
        spacing={3}
        sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
      >
        {/* Polypoints and icon */}
        {/* TODO: Update icons when we will have better ones */}
        <Polypoints color={color} points={points} size="normal" />
        {isCaptain && (
          <span>
            <Image src="/images/captain.png" width={40} height={30} />
          </span>
        )}
        {!isCaptain && (
          <IconButton size="medium" sx={{ ml: 2, mr: -2 }} edge="start">
            <TrashIcon />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}

TeamRow.defaultProps = {
  isCaptain: false,
};
