import React from 'react';
import { Router, withRouter, RouteComponentProps } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
import { css } from 'glamor'
import { registerLanguage } from "react-syntax-highlighter/light";
import ReactGA from 'react-ga';

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

if (typeof window !== 'undefined') {
  ReactGA.initialize(process.env.REACT_STATIC_ENV === 'production' ? 'UA-37847298-1' : 'UA-37847298-3');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

class Tracking extends React.Component<RouteComponentProps<any>> {

  unsubcribe: () => void;

  componentDidMount() {
    this.unsubcribe = this.props.history.listen(l => {
      ReactGA.pageview(l.pathname + l.search);
    });
  }

  componentWillUnmount() {
    if (this.unsubcribe) this.unsubcribe();
  }

  render() {
    return this.props.children;
  }

}

const TrackingWithRouting = withRouter(Tracking);

const App = () => (
  <Router>
    <TrackingWithRouting>
      <Routes />
    </TrackingWithRouting>
  </Router>
)

export default hot(module)(App)
