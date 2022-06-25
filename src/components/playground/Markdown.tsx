import React from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownCode from './MarkdownCode';

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        code: MarkdownCode,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
