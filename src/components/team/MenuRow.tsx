import { Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';

type Props = {
  label: string;
  value: string;
  image?: string;
};

export default function MenuRow({ label, value, image }: Props) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      flexGrow={1}
      width={280}
      justifyContent="space-between"
    >
      <Typography variant="h5">{label}</Typography>
      <Stack direction="row" alignItems="center" spacing={20}>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.primary,
            marginRight: image ? '10px' : 0,
          }}
        >
          {value}
        </Typography>
        {image && <Image src={image} width="32" height="32" />}
      </Stack>
    </Stack>
  );
}

MenuRow.defaultProps = {
  image: undefined,
};
