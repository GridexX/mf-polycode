import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';

import ContentList from './ContentList';

import styles from '../../styles/components/contents/Contents.module.css';

export default function Contents() {
  // import mui theme
  const theme = useTheme();

  const fakeData = [
    {
      id: 'uuid1',
      type: 'exercise',
      title: 'Hello World',
      description:
        'In this exercise, you will print "Hello World" on the console !',
      carrot: 500,
    },
    {
      id: 'uuid2',
      type: 'exercise',
      title: 'Le Vaisseau Mère',
      description: 'description2',
      carrot: 300,
    },
    {
      id: 'uuid3',
      type: 'exercise',
      title: 'Dracula',
      description: 'description3',
      carrot: 1000,
    },
    {
      id: 'uuid4',
      type: 'exercise',
      title: 'Ownership in Rust',
      description: 'description4',
      carrot: 2500,
    },
    {
      id: 'uuid5',
      type: 'exercise',
      title: 'Loop For While',
      description: 'description5',
      carrot: 100,
    },
    {
      id: 'uuid6',
      type: 'lesson',
      title: 'Le Dogo et Le Gato',
      description: 'description6',
      carrot: 250,
    },
  ];

  return (
    <Box className={styles.container}>
      <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
        Contents
      </Typography>
      <ContentList contents={fakeData} />
    </Box>
  );
}
