import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Signup from './routes/Signup';
import Summary from './routes/Summary';
import './App.css';

const history = createHistory();

const NotFound = () => <h1>Page not found (404)</h1>;

class App extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={30000}>
                  <Switch location={location}>
                    <Route exact path="/form" component={Signup} />
                    <Route exact path="/summary" component={Summary} />
                    <Route component={NotFound} />
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
