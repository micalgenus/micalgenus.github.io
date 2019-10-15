import React from 'react';
import { PreviewPost } from '../preview-content';
import PreviewContent from '@/components/preview-content';

interface Props {
  posts: PreviewPost[];
}

export default ({ posts }: Props) => {
  return (
    <ul className="preview-container">
      {posts.map(post => (
        <PreviewContent key={post.frontmatter.path} {...post} />
      ))}
    </ul>
  );
};
