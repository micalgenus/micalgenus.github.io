import React from 'react';
import ArchiveContent, { PostMeta } from '@/components/archive-content';

import './index.css';

interface Props {
  title: string;
  momentFormat?: string;
  items: Pick<PostMeta, 'path' | 'title' | 'date'>[];
}

export default ({ title, momentFormat, items }: Props) => {
  return (
    <div className="archive-container">
      <div className="archive-title">
        <h3>{title}</h3>
      </div>
      <ul>
        {items.map(item => (
          <ArchiveContent key={item.path} {...item} momentFormat={momentFormat} />
        ))}
      </ul>
    </div>
  );
};
