import React from 'react';
import useSWR from 'swr';

import { Timeline } from '../Timeline';

/**
 * @typedef {object} Props
 * @property {string} username
 * @property {number} page
 */

/** @type {React.VFC<Props>} */
const TimelineUserPage = ({ page, username }) => {
  const { data: timeline } = useSWR(`/api/v1/users/${username}/posts?offset=${10 * page}&limit=10`, (url) => fetch(url).then(res => res.json()))

  if(!timeline) {
    return null
  }

  return <Timeline timeline={timeline} />;
};

export { TimelineUserPage };
