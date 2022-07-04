import React from 'react';
import { Box } from '@mui/material';

import HeroTale from '../../components/modules/HeroTale';
import ModuleList from '../../components/modules/ModuleList';
import ContentList from '../../components/contents/ContentList';

import styles from '../../styles/pages/module/ModuleDetails.module.css';

export default function ModuleDetails() {
  const fakeData = {
    id: 'uuid1',
    title: '10 days with Javascript',
    tags: ['Javascript'],
    description: 'In this module, you will learn some Javascript bases !',
    progress: 33,
    reward: 3000,
    image:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    modules: [
      {
        id: 'uuid2',
        title: 'Survive 40 days with Rust',
        tags: ['Rust'],
        description: 'Survive in the big world of Rust during 40 days !',
        progress: 50,
        reward: 8000,
        image:
          'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
      },
      {
        id: 'uuid4',
        title: "Java the garbage's champion",
        tags: ['Java'],
        description: 'Learn how garbage collector work with java',
        progress: 0,
        reward: 3000,
        image:
          'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg',
      },
    ],
    contents: [
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
    ],
  };

  const { modules, contents, ...moduleInfo } = fakeData;

  return (
    <Box className={styles.container}>
      {/* header */}
      <HeroTale module={moduleInfo} />

      {/* modules */}
      <Box className={styles.modulesContainer}>
        {fakeData.modules && <ModuleList modules={fakeData.modules} />}
      </Box>

      {/* contents */}
      <Box className={styles.contentsContainer}>
        {fakeData.contents && <ContentList contents={fakeData.contents} />}
      </Box>
    </Box>
  );
}