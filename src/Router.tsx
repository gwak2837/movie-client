import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "pages/Home";
import About from "pages/About";
import Detail from "pages/Detail";
import Signup from "pages/Signup";
import Login from "pages/Login";
import Logout from "pages/Logout";
import MyPage from "pages/MyPage";

function Router() {
  return (
    <HashRouter>
      <Navigation />
      <br />
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/@:id" component={MyPage} />
      <Redirect from="*" to="/" />
    </HashRouter>
  );
}

export default Router;
