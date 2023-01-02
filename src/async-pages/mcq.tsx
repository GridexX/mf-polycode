import React from 'react';
import dynamic from 'next/dynamic';
//Make the following line be ignored by the linter
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const Form = dynamic(() => import('remote/Form'), {
  ssr: false,
  loading: () => <p>Loading MCQ from dynamic import...</p>,
});
export default function MCQ() {
  return (
    <div>
      <h1>MCQ</h1>
      <Form />
    </div>
  )
}