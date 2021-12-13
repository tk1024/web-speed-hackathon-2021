import React from 'react';

import { Timeline } from '../Timeline';

interface Props {
  timeline: any[]
}

/** @type {React.VFC<Props>} */
const TimelinePage = ({ timeline }: Props) => {
  return <Timeline timeline={timeline} />;
};

export { TimelinePage };
