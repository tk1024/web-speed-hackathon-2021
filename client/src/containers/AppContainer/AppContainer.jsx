import React, { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer';
import { NewPostModalContainer } from '../NewPostModalContainer';

const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));
const PostContainer = React.lazy(() => import('../PostContainer'));
const TermContainer = React.lazy(() => import('../TermContainer'));
const TimelineContainer = React.lazy(() => import('../TimelineContainer'));
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer'));

/** @type {React.VFC} */
const AppContainer = ({ initialProps }) => {
  const [ips, setIps] = useState(initialProps)
  const [activeUser, setActiveUser] = React.useState(null);
  const { data } = useFetch('/api/v1/me', fetchJSON);
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setPrevPathname(pathname);
  }, [pathname]);

  React.useEffect(() => {
    if (pathname !== prevPathname) {
      setIps(null)
    }
  }, [pathname])

  useEffect(() => {
    setActiveUser(data)
  }, [data])

  React.useEffect(() => {
    document.head.innerHTML += `<link rel="stylesheet" href="/styles/webfont.css">`
  }, [])

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <React.Suspense fallback={<>...</>}>
          <Routes>
            <Route element={<TimelineContainer initialProps={ips} />} path="/" />
            <Route element={<UserProfileContainer />} path="/users/:username" />
            <Route element={<PostContainer />} path="/posts/:postId" />
            <Route element={<TermContainer />} path="/terms" />
            <Route element={<NotFoundContainer />} path="*" />
          </Routes>
        </React.Suspense>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export { AppContainer };
