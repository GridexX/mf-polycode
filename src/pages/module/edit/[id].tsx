import { useRouter } from 'next/router';
import React from 'react';

import ModuleEditor from '../../../components/modules/editor/ModuleEditor';

export default function Editor() {
  const router = useRouter();

  const { id } = router.query;

  if (!id) return null;

  return <ModuleEditor id={`${id}`} />;
}
