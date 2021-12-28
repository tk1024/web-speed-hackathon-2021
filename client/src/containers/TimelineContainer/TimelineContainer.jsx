import { useState } from 'preact/hooks';
import React from 'react';
import { Helmet } from 'react-helmet';
import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { TimelinePage } from '../../components/timeline/TimelinePage';

/** @type {React.VFC} */
const TimelineContainer = () => {
  const [cnt, setCnt] = useState(1)

  const pages = []
  for (let i = 0; i < cnt; i++) {
    pages.push(<TimelinePage key={i} page={i} />)
  }

  return (
    <InfiniteScroll fetchMore={() => setCnt(page => page + 1)}>
      <Helmet>
        <title>タイムライン - CAwitter</title>
      </Helmet>
      {pages}
    </InfiniteScroll>
  );
};

export { TimelineContainer };
