import React from 'react';
import ArchiveContent, { PostMeta } from '@/components/archive-content';

import './index.css';

interface Props {
  year: string;
  items: PostMeta[];
}

export default ({ year, items }: Props) => {
  return (
    <div className="archive-container">
      <div className="archive-title">
        <h3>{year}</h3>
      </div>
      <ul>
        {items.map(item => (
          <ArchiveContent key={item.path} {...item} />
        ))}
      </ul>
    </div>
  );
};
