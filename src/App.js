import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Signup from './routes/Signup';
import Summary from './routes/Summary';
import './App.css';

const history = createHistory();

class App extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Link to="/a">AAAAAA</Link>
          <Link to="/b">BBBBBB</Link>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                  <Switch location={location}>
                    <Route path="/a" component={Signup} />
                    <Route path="/b" component={Summary} />
                    <Redirect from="/" to="/a" />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
