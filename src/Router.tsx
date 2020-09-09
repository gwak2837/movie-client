import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Home from 'routes/Home';
import About from 'routes/About';
import Detail from 'routes/Detail';
import Signup from 'routes/Signup';
//import Login from 'routes/Login';
import Logout from 'routes/Logout';
import MyPage from 'routes/MyPage';

export default () => (
  <HashRouter>
    <Navigation />
    <br />
    <Route path="/" component={Home} exact={true} />
    <Route path="/about" component={About} />
    <Route path="/movie/:id" component={Detail} />
    <Route path="/signup" component={Signup} />
    {/*<Route path="/login" component={Login} />*/}
    <Route path="/logout" component={Logout} />
    <Route path="/@:id" component={MyPage} />
    <Redirect from="*" to="/" />
  </HashRouter>
);
