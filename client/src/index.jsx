import { h, render } from 'preact';
import { AppContainer } from './containers/AppContainer';

const { props } = JSON.parse(document.getElementById("initialProps").innerText)

if (process.env.NODE_ENV === 'development') {
  // Must use require here as import statements are only allowed
  // to exist at top-level.
  require("preact/debug");
}

render(<AppContainer fallback={props} />, document.getElementById('app'),
);

window.addEventListener("load", () => {
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = '/styles/webfont.mini.css';
  document.head.append(font);
})