import React from 'react';
import Image from 'next/image';
import { Stack, Typography, useTheme } from '@mui/material';

import carrot from '../images/carrot.png';

type Props = {
  points: number;
  size?: 'small' | 'medium' | 'normal' | 'large';
  color?: string;
};

export default function Polypoints({ points, size, color }: Props) {
  let widthAndHeight;

  const theme = useTheme();

  switch (size) {
    case 'small':
      widthAndHeight = '18px';
      break;
    case 'medium':
      widthAndHeight = '24px';
      break;
    case 'normal':
      widthAndHeight = '32px';
      break;
    case 'large':
      widthAndHeight = '48px';
      break;
    default:
      widthAndHeight = '32px';
      break;
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography
        color={color ?? theme.palette.text.primary}
        sx={{
          marginRight: '10px',
          paddingTop: '2px',
          textOverflow: 'ellipsis',
        }}
      >
        {points}
      </Typography>
      <Image
        width={widthAndHeight}
        height={widthAndHeight}
        layout="fixed"
        src={carrot}
      />
    </Stack>
  );
}

Polypoints.defaultProps = {
  size: 'normal',
  color: undefined,
};
