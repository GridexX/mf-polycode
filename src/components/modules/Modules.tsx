import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';

import ModuleList from './ModuleList';
import { useTranslation } from '../../lib/translations';

import styles from '../../styles/components/modules/Modules.module.css';

export default function Modules() {
  // import mui theme & i18n
  const theme = useTheme();
  const { i18n } = useTranslation();

  const fakeModules = [
    {
      id: 'uuid1',
      title: '10 days with Javascript',
      tags: ['Javascript'],
      description: 'In this module, you will learn some Javascript bases !',
      progress: 33,
      reward: 3000,
      image:
        'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    },
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
      id: 'uuid3',
      title: 'Dracula',
      tags: ['Python'],
      description: 'Vampires exercises !',
      progress: 100,
      reward: 1000,
      image:
        'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',
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
    {
      id: 'uuid5',
      title: 'Loop For While',
      tags: ['Javascript', 'Rust'],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      progress: 0,
      reward: 2000,
      image:
        'https://img-19.commentcamarche.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg',
    },
  ];

  return (
    <Box className={styles.container}>
      <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
        {i18n.t('modules.titlePage')}
      </Typography>
      <ModuleList modules={fakeModules} />
    </Box>
  );
}
