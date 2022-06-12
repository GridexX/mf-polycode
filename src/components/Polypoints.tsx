import React from 'react';
import Image from 'next/image';
import { Stack, Typography, useTheme } from '@mui/material';

type Props = {
  points: number;
  size: 'small' | 'medium' | 'normal' | 'large';
};

export default function Polypoints({ points, size }: Props) {
  let widthAndHeight;

  const theme = useTheme();

  switch (size) {
    case 'small':
      widthAndHeight = '18';
      break;
    case 'medium':
      widthAndHeight = '24';
      break;
    case 'normal':
      widthAndHeight = '32';
      break;
    case 'large':
      widthAndHeight = '48';
      break;
    default:
      widthAndHeight = '32';
      break;
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography color={theme.palette.text.primary} sx={{ marginRight: '10px' }}>
        {points}
      </Typography>
      <Image
        width={widthAndHeight}
        height={widthAndHeight}
        src='/images/carrot.png'
      />
    </Stack>
  );
}
