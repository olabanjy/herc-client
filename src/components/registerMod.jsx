import React from "react";
import Joi from "joi-browser";
import Form from "./helpers/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterModForm extends Form {
  state = {
    data: { email: "", password: "", username: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(8).label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.registerMod(this.state.data);
      //   auth.loginWithJwt(response.headers["x-auth-token"]);
      auth.loginWithJwt(response.data);
      console.log(response);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = "A user with these details already exist";
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Create Moderator </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterModForm;
