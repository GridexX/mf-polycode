import I18n from 'i18n-js';
import { useRouter } from 'next/router';
import React from 'react';
import Playground from '../../components/playground/Playground';

export default function Module() {
  const router = useRouter();

  const { path } = router.query;

  if (!path) return null;

  if (path[path.length - 1] === 'play' && path.length > 1) {
    return <Playground id={`${path[path.length - 2]}`} />;
  }

  return (
    <div>
      <h1>{I18n.t('pages.module.path.modulesHere')}</h1>
    </div>
  );
}
