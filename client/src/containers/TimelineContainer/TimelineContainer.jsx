import { useState } from 'preact/hooks';
import { Title } from "../../components/title/title"
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
    <>
      <Title>タイムライン - CAwitter</Title>
      <InfiniteScroll fetchMore={() => setCnt(page => page + 1)}>
        {pages}
      </InfiniteScroll>
    </>
  );
};

export { TimelineContainer };
