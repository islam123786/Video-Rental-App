import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "./../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await auth.login({
        email: this.state.data.username,
        password: this.state.data.password,
      });
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit} action="">
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
