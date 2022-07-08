import React from 'react';
import Container from '../components/playground/Container';

import { Content } from '../lib/api/playground';

const content: Content = {
  id: '1',
  name: 'Test',
  description: 'test',
  reward: 10,
  type: 'test',
  rootComponent: {
    id: 'root',
    type: 'container',
    data: {
      orientation: 'vertical',
      components: [
        {
          id: '2',
          type: 'markdown',
          data: {
            markdown:
              '# Hello World\nsome text \n```js\nconsole.log("Hello World");\n```\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntest\n\ntestv',
          },
        },
        {
          id: '1',
          type: 'editor',
          data: {
            editorSettings: {
              languages: [
                { defaultCode: 'test', language: 'NODE', version: '4' },
                {
                  defaultCode: 'println!("test")',
                  language: 'RUST',
                  version: '4',
                },
              ],
            },
            items: ['bpoauieau', 'augxyqeuai'],
            validators: [
              {
                id: '1',
                input: {
                  stdin: ['test'],
                },
                expected: { stdout: ['test'] },
                isHidden: false,
              },
              {
                id: '2',
                input: {
                  stdin: ['test'],
                },
                expected: { stdout: ['test'] },
                isHidden: false,
              },
              {
                id: '3',
                input: {
                  stdin: ['test'],
                },
                expected: { stdout: ['test'] },
                isHidden: false,
              },
              {
                id: '4',
                input: {
                  stdin: ['test'],
                },
                expected: { stdout: ['test'] },
                isHidden: false,
              },
              {
                id: '5',
                input: {
                  stdin: ['test'],
                },
                expected: { stdout: ['test'] },
                isHidden: false,
              },
              {
                id: '6',
                input: {
                  stdin: ['test'],
                },
                expected: { stdout: ['test'] },
                isHidden: false,
              },
              {
                id: '7',
                isHidden: true,
              },
            ],
          },
        },
      ],
    },
  },
};

export default function Test() {
  return <Container component={content.rootComponent} />;
}
