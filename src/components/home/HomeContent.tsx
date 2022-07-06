import React from 'react';
import { Box } from '@mui/material';

import TitledContentList from '../titledLists/TitledContentList';
import TitledModuleList from '../titledLists/TitledModuleList';

import styles from '../../styles/components/home/HomeContent.module.css';
import { Content } from '../../lib/api/content';

export default function HomeContent() {
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
  const fakeContents = [
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
    {
      id: 'uuid6',
      type: 'exercise',
      name: 'Le Dogo et Le Gato',
      description: 'description6',
      reward: 250,
      rootComponent: fakeComponents,
    },
  ];

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
      description: 'Learn how loops work',
      progress: 0,
      reward: 2000,
      image:
        'https://img-19.commentcamarche.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg',
    },
  ];

  return (
    <Box className={styles.container}>
      <TitledContentList
        title="Last Viewed"
        contents={[fakeContents[0] as Content]}
      />
      <TitledContentList
        title="New Contents"
        contents={fakeContents.slice(0, 3) as Content[]}
      />
      <TitledModuleList title="New Modules" modules={fakeModules} />
      <TitledContentList
        title="Preferred Contents"
        contents={fakeContents.slice(0, 6) as Content[]}
      />
    </Box>
  );
}
