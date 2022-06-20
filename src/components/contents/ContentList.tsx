import React from 'react';
import { Box } from '@mui/material';

import Content from './Content';
import ContentType from '../../lib/api/content';

import styles from '../../styles/components/contents/ContentList.module.css';

type Props = {
  contents: ContentType[];
};

export default function ContentList({ contents }: Props) {
  return (
    <Box className={styles.container}>
      {contents && contents.length > 0
        ? contents.map((content: ContentType) => (
            <Content key={content.title} content={content} />
          ))
        : 'loading...'}
    </Box>
  );
}
