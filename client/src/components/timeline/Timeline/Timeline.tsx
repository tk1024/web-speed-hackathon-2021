import React from 'react';

import { TimelineItem } from '../TimelineItem';

interface Props {
  timeline: any[]
}

/** @type {React.VFC<Props>} */
const Timeline = ({ timeline }: Props) => {
  return (
    <section>
      {timeline.map((post, index) => {
        return <TimelineItem key={post.id} post={post} index={index} />;
      })}
    </section>
  );
};

export { Timeline };
