import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from './containers/AppContainer';


window.addEventListener('load', () => {
  ReactDOM.render(
    <BrowserRouter>
      <AppContainer initialProps={window.initialProps} />
    </BrowserRouter>,
    document.getElementById('app'),
  );
});
