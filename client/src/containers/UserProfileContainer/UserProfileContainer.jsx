import { useState } from 'preact/hooks';
import { useRoute } from 'wouter-preact';
import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { TimelineUserPage } from '../../components/timeline/TimelineUserPage/TimelinePage';
import { Title } from '../../components/title/title';
import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const [match, params] = useRoute("/users/:name");
  const username = params.username
  const [cnt, setCnt] = useState(1)

  const { data: user, isLoading: isLoadingUser } = useFetch(`/api/v1/users/${username}`, fetchJSON);

  const pages = []
  for (let i = 0; i < cnt; i++) {
    pages.push(<TimelineUserPage key={i} page={i} username={username} />)
  }

  if (isLoadingUser) {
    return (
      <Title>読込中 - CAwitter</Title>
    );
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  return (
    <>
      <Title>{user.name} さんのタイムライン - CAwitter</Title>
      <InfiniteScroll fetchMore={() => setCnt(page => page + 1)}>

        <UserProfilePage user={user} />
        <div className="mt-6 border-t border-gray-300">
          {pages}
        </div>
      </InfiniteScroll>
    </>
  );
};

export { UserProfileContainer };
