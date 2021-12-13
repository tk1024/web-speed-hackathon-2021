import React from 'react';

import { TimelineItem } from '../TimelineItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

/** @type {React.VFC<Props>} */
const Timeline = ({
  timeline
}: any) => {
  return (
    <section>
      {timeline.map((post: any) => {
        return <TimelineItem key={post.id} post={post} />;
      })}
    </section>
  );
};

export { Timeline };
