import React from 'react';
import { Helmet } from 'react-helmet';
import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';

interface Props {
  posts: any[]
}

const TimelineContainer = (props: Props) => {
  const { data: posts, fetchMore } = useInfiniteFetch('/api/v1/posts', fetchJSON, props.posts);

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <Helmet>
        <title>タイムライン - CAwitter</title>
      </Helmet>
      <TimelinePage timeline={posts} />
    </InfiniteScroll>
  );
};

export { TimelineContainer };
