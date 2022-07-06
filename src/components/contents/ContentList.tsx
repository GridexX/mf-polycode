import React from 'react';
import { Box } from '@mui/material';

import Content from './Content';
import { Content as ContentType } from '../../lib/api/content';

import styles from '../../styles/components/contents/ContentList.module.css';

type Props = {
  contents: ContentType[];
};

export default function ContentList({ contents }: Props) {
  return (
    <Box className={styles.container}>
      {contents && contents.length > 0
        ? contents.map((content: ContentType) => (
            <Box key={content.id} className={styles.contentContainer}>
              <Content content={content} />
            </Box>
          ))
        : 'loading...'}
    </Box>
  );
}
