import React, { Component } from "react";
import api from "../../services/api";
// import { addTask } from "../../store/actions";

import "./new.scss";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    await api.post("todos", {
      description: this.state.description
    });
  };

  render() {
    return (
      <form id="new-task" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="O que você não pode esquecer?"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <button type="submit" className="btn btn-primary">
          +
        </button>
      </form>
    );
  }
}
export default New;
