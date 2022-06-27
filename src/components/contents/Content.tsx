import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import ContentType from '../../lib/api/content';

import styles from '../../styles/components/contents/Content.module.css';

import exercise from '../../images/exercise.png';
import lesson from '../../images/lesson.png';
import carrot from '../../images/carrot.png';

type Props = {
  content: ContentType;
};

export default function Content({ content }: Props) {
  // import mui theme
  const theme = useTheme();

  return (
    <Link href={`/content/${content.id}`}>
      <Box
        className={styles.container}
        sx={{ border: `1px solid ${theme.palette.text.secondary}` }}
      >
        {/* header */}
        <Box className={styles.headerContainer}>
          <Typography
            className={styles.type}
            sx={{ color: theme.palette.text.secondary }}
          >
            {content.type}
          </Typography>
          <Typography className={styles.title}>{content.title}</Typography>
        </Box>

        {/* footer */}
        <Box className={styles.footerContainer}>
          <Box className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={content.type === 'exercise' ? exercise : lesson}
            />
          </Box>
          {/* description */}
          <Box className={styles.descriptionContainer}>
            <Typography className={styles.description}>
              {content.description}
            </Typography>
            {/* carrot */}
            <Box className={styles.carrotContainer}>
              <Box className={styles.innerCarrotContainer}>
                <Typography className={styles.nbCarrot}>
                  {content.carrot}
                </Typography>
                <Image
                  className={styles.carrot}
                  src={carrot}
                  alt="Polypoint logo"
                  width="25px"
                  height="25px"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
