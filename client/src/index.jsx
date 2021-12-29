import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { AppContainer } from './containers/AppContainer';

const { props } = JSON.parse(document.getElementById("initialProps").innerText)

ReactDOM.render(
  <SWRConfig value={{ fallback: props.fallback, revalidateIfStale: false }}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </SWRConfig>,
  document.getElementById('app'),
);