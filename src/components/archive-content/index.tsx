import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';

import './index.css';

export interface PostMeta {
  path: string;
  title: string;
  date: string;
}

export default ({ date, title, path }: PostMeta) => {
  return (
    <li>
      <span>{moment(date).format('MMM DD')}</span>
      <Link to={path}>{title}</Link>
    </li>
  );
};
