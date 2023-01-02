import dynamic from 'next/dynamic';
const DynamicMCQ = dynamic(
  async () => {
    return import('../async-pages/mcq');
  },
  {
    ssr: false,
  },
);

export default function MCQ() {
  return <DynamicMCQ />;
  
}