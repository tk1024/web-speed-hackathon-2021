import { lazy, Suspense } from 'preact/compat';
import { useCallback, useEffect, useState } from 'preact/hooks';
import useSWR from 'swr';
import { Route, useLocation } from "wouter-preact";
import { AppPage } from '../../components/application/AppPage';
import { fetchJSON } from '../../utils/fetchers';
import { SWRConfig } from 'swr';

// import { TimelineContainer } from '../TimelineContainer'
// import { UserProfileContainer } from '../UserProfileContainer'
// import { PostContainer } from '../PostContainer'

const TimelineContainer = lazy(() => import('../TimelineContainer').then(module => ({ default: module.TimelineContainer })));
const UserProfileContainer = lazy(() => import('../UserProfileContainer').then(module => ({ default: module.UserProfileContainer })));
const PostContainer = lazy(() => import('../PostContainer').then(module => ({ default: module.PostContainer })));
const TermContainer = lazy(() => import('../TermContainer').then(module => ({ default: module.TermContainer })));
const NotFoundContainer = lazy(() => import('../NotFoundContainer').then(module => ({ default: module.NotFoundContainer })));
const NewPostModalContainer = lazy(() => import('../NewPostModalContainer').then(module => ({ default: module.NewPostModalContainer })));
const AuthModalContainer = lazy(() => import('../AuthModalContainer').then(module => ({ default: module.AuthModalContainer })));

/** @type {React.VFC} */
const AppContainer = (props) => {
  useLocation(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeUser, setActiveUser] = useState(null);
  const { data } = useSWR('/api/v1/me', fetchJSON)

  useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = useState('none');
  const handleRequestOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = useCallback(() => setModalType('none'), []);

  return (
    <>
      <SWRConfig value={{ fallback: props.fallback, revalidateIfStale: false }}>
        <AppPage
          activeUser={activeUser}
          onRequestOpenAuthModal={handleRequestOpenAuthModal}
          onRequestOpenPostModal={handleRequestOpenPostModal}
        >
          {/* <Suspense fallback={<p />}>
          <Route path="/"><TimelineContainer /></Route>
          <Route path="/users/:username"><UserProfileContainer /></Route>
          <Route path="/posts/:postId"><PostContainer /></Route>
          <Route path="/terms"><TermContainer /></Route>
          <Route path="*"><NotFoundContainer /></Route>
        </Suspense> */}
        </AppPage>

        {modalType === 'auth' ? (
          <Suspense fallback={<p />}>
            <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
          </Suspense>
        ) : null}
        {modalType === 'post' ? (
          <Suspense fallback={<p />}>
            <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} />
          </Suspense>
        ) : null}
      </SWRConfig>
    </>

  );
};

export { AppContainer };
