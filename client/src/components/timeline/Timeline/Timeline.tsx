import React, { useEffect, useState } from 'react';

import { TimelineItem } from '../TimelineItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

/** @type {React.VFC<Props>} */
const Timeline = ({ timeline }: any) => {
  const [fv, setFv] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setFv(false)
    }, 1000)
  }, [])

  const tl = fv ? timeline.slice(0, 5) : timeline

  return (
    <section style={fv ? { height: "10000px" } : { }}>
      {tl.map((post: any) => {
        return <TimelineItem key={post.id} post={post} />;
      })}
    </section>
  );
};

export { Timeline };
