import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { TimelineUserPage } from '../../components/timeline/TimelineUserPage/TimelinePage';
import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';


/** @type {React.VFC} */
const UserProfileContainer = () => {
  const { username } = useParams();
  const [cnt, setCnt] = React.useState(1)

  const { data: user, isLoading: isLoadingUser } = useFetch(`/api/v1/users/${username}`, fetchJSON);

  const pages = []
  for (let i = 0; i < cnt; i++) {
    pages.push(<TimelineUserPage key={i} page={i} username={username} />)
  }

  if (isLoadingUser) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={() => setCnt(page => page + 1)}>
      <Helmet>
        <title>{user.name} さんのタイムライン - CAwitter</title>
      </Helmet>
      <UserProfilePage user={user} />
      <div className="mt-6 border-t border-gray-300">
        {pages}
      </div>
    </InfiniteScroll>
  );
};

export { UserProfileContainer };
