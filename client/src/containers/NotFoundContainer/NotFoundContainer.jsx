import React from 'react';
import { NotFoundPage } from '../../components/application/NotFoundPage';
import { Title } from '../../components/title/title';


/** @type {React.VFC} */
const NotFoundContainer = () => {
  return (
    <>
      <Title>ページが見つかりません - CAwitter</Title>
      <NotFoundPage />
    </>
  );
};

export { NotFoundContainer };
