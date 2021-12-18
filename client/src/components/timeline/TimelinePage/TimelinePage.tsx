import React from 'react';

import { Timeline } from '../Timeline';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

/** @type {React.VFC<Props>} */
const TimelinePage = ({
 timeline
}: any) => {
  return <Timeline timeline={timeline} />;
};

export { TimelinePage };
