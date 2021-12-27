import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

const TimelineContainer = React.lazy(() => import('../TimelineContainer').then(module => ({ default: module.TimelineContainer })));
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer').then(module => ({ default: module.UserProfileContainer })));
const PostContainer = React.lazy(() => import('../PostContainer').then(module => ({ default: module.PostContainer })));
const TermContainer = React.lazy(() => import('../TermContainer').then(module => ({ default: module.TermContainer })));
const NotFoundContainer = React.lazy(() => import('../NotFoundContainer').then(module => ({ default: module.NotFoundContainer })));
const NewPostModalContainer = React.lazy(() => import('../NewPostModalContainer').then(module => ({ default: module.NewPostModalContainer })));
const AuthModalContainer = React.lazy(() => import('../AuthModalContainer').then(module => ({ default: module.AuthModalContainer })));

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  React.useEffect(() => {
    requestIdleCallback(() => {
      document.querySelector('[href="/styles/webfont.mini.css"]').setAttribute("rel", "stylesheet")
    })
  }, [])

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Suspense fallback={""}>
          <Routes>
            <Route element={<TimelineContainer />} path="/" />
            <Route element={<UserProfileContainer />} path="/users/:username" />
            <Route element={<PostContainer />} path="/posts/:postId" />
            <Route element={<TermContainer />} path="/terms" />
            <Route element={<NotFoundContainer />} path="*" />
          </Routes>
        </Suspense>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export { AppContainer };
