import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { toastError, toastSuccess } from '../../../components/base/toast/Toast';
import ContentEditorWizard from '../../../components/contents/edit/ContentEditorWizard';
import {
  Content,
  defaultContent,
  getContent,
  updateContent,
} from '../../../lib/api/content';
import { useLoginContext } from '../../../lib/loginContext';
import { useTranslation } from '../../../lib/translations';

export default function ContentEditor() {
  const { i18n } = useTranslation();
  const { credentialsManager } = useLoginContext();
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = React.useState<Content>(
    defaultContent as Content
  );
  const [fetchLoading, setFetchLoading] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);

  React.useEffect(() => {
    setFetchLoading(true);
    if (typeof id === 'string') {
      getContent(credentialsManager, id)
        .then((c) => setContent(c))
        .catch(() =>
          toastError(
            <Typography>
              {i18n.t('contentEditor.page.errors.serverFetchFailed')}
            </Typography>
          )
        )
        .finally(() => setFetchLoading(false));
    }
  }, [credentialsManager, i18n, id]);

  // --- handlers ---

  const handleSave = () => {
    setSaveLoading(true);
    updateContent(credentialsManager, typeof id === 'string' ? id : '', {
      ...content,
      id: undefined,
      data: {},
    })
      .then(() =>
        toastSuccess(
          <Typography>{i18n.t('contentEditor.page.saveSuccess')}</Typography>
        )
      )
      .catch(() =>
        toastError(
          <Typography>
            {i18n.t('contentEditor.page.errors.serverSaveFailed')}
          </Typography>
        )
      )
      .finally(() => setSaveLoading(false));
  };

  // --- render ---

  return (
    <ContentEditorWizard
      content={content}
      onChange={setContent}
      onSave={handleSave}
      isLoading={fetchLoading}
      isSaving={saveLoading}
      titleText={i18n.t('contentEditor.page.titleEdit')}
    />
  );
}
