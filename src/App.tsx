import React from 'react';
import { Router } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
import { css } from 'glamor'
import { registerLanguage } from "react-syntax-highlighter/light";

const kotlin = require('react-syntax-highlighter/languages/hljs/kotlin').default;
const bash = require('react-syntax-highlighter/languages/hljs/bash').default;
const java = require('react-syntax-highlighter/languages/hljs/java').default;

registerLanguage('kotlin', kotlin);
registerLanguage('bash', bash);
registerLanguage('java', java);

import 'normalize.css/normalize.css';

css.global('html', {
  minHeight: '100vh',
});

css.global('body', {
  fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  fontWeight: 300,
  fontSize: 16,
  margin: 0,
  padding: 0,
  height: '100%',
});

const App = () => (
  <Router>
    <Routes />
  </Router>
)

export default hot(module)(App)
