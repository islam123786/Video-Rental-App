import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = {};
    obj[name] = value;

    console.log(this.schema);

    const result = Joi.validate(obj, this.schema);

    if (!result.error) return null;

    const errors = {};
    errors[result.error.details[0].path[0]] = result.error.details[0].message;

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //const errors = { ...this.state.errors };
    const errors = this.validateProperty(input);
    //if (errorMessage) errors[input.name] = errorMessage;

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors: errors || {} });
  };

  renderButton = (label) => {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary"
        style={{ marginTop: 10 }}
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
