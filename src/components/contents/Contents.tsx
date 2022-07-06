import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';

import ContentList from './ContentList';

import styles from '../../styles/components/contents/Contents.module.css';
import { Content } from '../../lib/api/content';

export default function Contents() {
  // import mui theme
  const theme = useTheme();

  const fakeComponents = {
    type: 'container',
    data: {
      components: [
        {
          type: 'markdown',
          data: {
            markdown: 'Hello World',
          },
        },
        {
          type: 'editor',
          data: {
            validators: [],
            items: [],
            editorSettings: {
              languages: [
                {
                  language: 'javascript',
                  defaultCode: 'console.log("Hello World");',
                  version: '18.0',
                },
              ],
            },
          },
        },
      ],
      orientation: 'horizontal',
    },
  };
  const fakeData = [
    {
      id: 'uuid1',
      type: 'exercise',
      name: 'Hello World',
      description:
        'In this exercise, you will print "Hello World" on the console !',
      reward: 500,
      rootComponent: fakeComponents,
    },
    {
      id: 'uuid2',
      type: 'exercise',
      name: 'Le Vaisseau Mère',
      description: 'description2',
      reward: 300,
      rootComponent: fakeComponents,
    },
    {
      id: 'uuid3',
      type: 'exercise',
      name: 'Dracula',
      description: 'description3',
      reward: 1000,
      rootComponent: fakeComponents,
    },
    {
      id: 'uuid4',
      type: 'exercise',
      name: 'Ownership in Rust',
      description: 'description4',
      reward: 2500,
      rootComponent: fakeComponents,
    },
    {
      id: 'uuid5',
      type: 'exercise',
      name: 'Loop For While',
      description: 'description5',
      reward: 100,
      rootComponent: fakeComponents,
    },
  ];

  return (
    <Box className={styles.container}>
      <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
        Contents
      </Typography>
      <ContentList contents={fakeData as Content[]} />
    </Box>
  );
}
