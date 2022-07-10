import { Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { toastError, toastSuccess } from '../../../components/base/toast/Toast';
import ContentEditorWizard from '../../../components/contents/edit/ContentEditorWizard';
import { Content, createContent } from '../../../lib/api/content';
import { useLoginContext } from '../../../lib/loginContext';
import { useTranslation } from '../../../lib/translations';

export default function ContentEditor() {
  const { i18n } = useTranslation();
  const { credentialsManager } = useLoginContext();
  const [content, setContent] = React.useState<Content>({
    type: 'exercise',
    name: '',
    description: '',
    reward: 0,
    rootComponent: {
      type: 'container',
      data: {
        orientation: 'horizontal',
        components: [],
      },
    },
    data: {},
  });
  const [saveLoading, setSaveLoading] = React.useState<boolean>(false);

  // --- handlers ---

  const handleSave = () => {
    setSaveLoading(true);
    createContent(credentialsManager, content)
      .then(() =>
        toastSuccess(
          <Typography>
            {i18n.t('pages.content.edit.index.saveSuccess')}
          </Typography>
        )
      )
      .catch(() =>
        toastError(
          <Typography>
            {i18n.t('pages.content.edit.index.saveError')}
          </Typography>
        )
      )
      .finally(() => setSaveLoading(false));
  };

  // --- render ---

  return (
    <>
      <Head>
        <title>{i18n.t('pages.content.edit.index.title')}</title>
      </Head>
      <ContentEditorWizard
        content={content}
        onChange={setContent}
        onSave={handleSave}
        isLoading={false}
        isSaving={saveLoading}
        titleText={i18n.t('pages.content.edit.index.title')}
      />
    </>
  );
}
