import useSWR from 'swr';

import { Timeline } from '../Timeline';

/**
 * @typedef {object} Props
 * @property {number} page
 */

/** @type {React.VFC<Props>} */
const TimelinePage = ({ page }) => {
  const { data: timeline } = useSWR(`/api/v1/posts?offset=${10 * page}&limit=10`, (url) => fetch(url).then(res => res.json()))

  if(!timeline) {
    return null
  }

  return <Timeline timeline={timeline} />;
};

export { TimelinePage };
