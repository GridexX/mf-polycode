import { useRouter } from 'next/router';
import React from 'react';

export default function Account() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace('/account/profile');
  }, [router]);

  return null;
}
