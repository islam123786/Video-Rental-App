import React, { Component } from "react";
import NavBar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MoviesForm from "./components/moviesForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <br />
        <main className="container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MoviesForm} />
            <Route
              path="/movies"
              render={(props) => <Movies user={this.state.user} {...props} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
