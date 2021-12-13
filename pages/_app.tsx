import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { AppPage } from '../client/src/components/application/AppPage';
import { AuthModalContainer } from '../client/src/containers/AuthModalContainer';
import { NewPostModalContainer } from '../client/src/containers/NewPostModalContainer';
import { useFetch } from '../client/src/hooks/use_fetch';
import { fetchJSON } from '../client/src/utils/fetchers';
import '../styles/globals.css';

/** @type {React.VFC} */
function MyApp({ Component, pageProps }: AppProps) {
  const [activeUser, setActiveUser] = React.useState<any>(null);
  const { data } = useFetch('/api/v1/me', fetchJSON);

  useEffect(() => {
    setActiveUser(data)
  }, [data])

  useEffect(() => {
    document.head.innerHTML += `<link rel="stylesheet" href="/webfont.css" />`
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
        <Component {...pageProps} />
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export default MyApp