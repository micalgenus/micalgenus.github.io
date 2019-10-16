import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';

import './index.css';

export interface PostMeta {
  path: string;
  title: string;
  date: string;
  categories: string[];
}

interface Props extends Pick<PostMeta, 'path' | 'title' | 'date'> {
  momentFormat?: string;
}

export default ({ date, title, path, momentFormat }: Props) => {
  return (
    <li>
      <span>{moment(date).format(momentFormat || 'MMM DD')}</span>
      <Link to={path}>{title}</Link>
    </li>
  );
};
