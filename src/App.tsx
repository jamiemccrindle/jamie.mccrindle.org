import React from 'react';
import { Router } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
import { css } from 'glamor'

import 'normalize.css/normalize.css';

css.global('html, body', {
  fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  fontWeight: 300,
  fontSize: 16,
  margin: 0,
  padding: 0,
});

const App = () => (
  <Router>
    <Routes />
  </Router>
)

export default hot(module)(App)
