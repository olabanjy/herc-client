import React, { Component, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import RegisterModForm from "./components/registerMod";
import Logout from "./components/logout";
import UserProfile from "./components/userProfile";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loans from "./components/loans";
import MyLoans from "./components/myLoans";
import AppliedLoans from "./components/appliedLoans";

const App = () => {
  let user_obj = {};
  const [user, setUser] = useState(user_obj);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/reg-mod" component={RegisterModForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/user-profile"
            render={(props) => <UserProfile {...props} user={user} />}
          />
          <Route
            path="/loans"
            render={(props) => <Loans {...props} user={user} />}
          />

          <Route
            path="/my-loans"
            render={(props) => <MyLoans {...props} user={user} />}
          />

          <Route
            path="/approve-loan"
            render={(props) => <AppliedLoans {...props} user={user} />}
          />

          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/loans" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
