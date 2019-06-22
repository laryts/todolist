import React, { Component } from "react";
import Moment from "react-moment";
import api from "../../services/api";

import Loading from "../utils/Loading";
import NewTodo from "./new";

import "./list.scss";
import "./new.scss";

import more from "../../assets/more.svg";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      description: "",
      edit: false,
      loading: true,
      list: []
    };
  }

  async componentDidMount() {
    const response = await api.get("todos");

    this.setState({ list: response.data, loading: false });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const newTodo = await api.post("todos", {
      description: this.state.description
    });

    this.setState({
      list: [...this.state.list, newTodo.data],
      description: ""
    });
  };

  handleItemClick = ({ _id, description, done, createdAt }) => {
    // Checkbox update state
    this.setState({
      list: this.state.list.map(todo =>
        todo._id === _id ? { ...todo, done: !done } : todo
      )
    });

    // Send checkbox update to API
    api.put(`/todos/${_id}`, { done: !done });
  };

  handleEdit = (e, { _id, description }) => {
    e.preventDefault();
    // Send checkbox update to API
    const newTodo = api.put(`/todos/${_id}`, {
      description: this.state.description
    });

    this.setState({
      list: this.state.list.map(todo =>
        todo._id === _id
          ? { ...todo, description: this.state.description }
          : todo
      ),
      edit: false
    });
  };

  handleOpenEdit = id => {
    this.setState({ edit: true, _id: id });
  };

  handleDelete = id => {
    // Delete item from state
    this.setState({
      list: this.state.list.filter(todo => todo._id !== id)
    });

    // Delete item from API
    api.delete(`/todos/${id}`);
  };

  render() {
    return (
      <section id="todo-list">
        {this.state.loading ? <Loading /> : null}

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
        <div className="list-group">
          {this.state.list.map(todo => (
            <div className="list-group-item" key={todo._id}>
              <div className="custom-control custom-checkbox d-flex w-100 justify-content-between pr-0">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  checked={todo.done}
                  onChange={() => this.handleItemClick(todo)}
                  name={`checkTodo${todo._id}`}
                  id={`checkTodo${todo._id}`}
                />
                <label
                  className={`custom-control-label d-block  ${
                    !todo.done ? "" : "disabled"
                  }`}
                  htmlFor={`checkTodo${todo._id}`}
                >
                  {this.state.edit && this.state._id === todo._id ? (
                    <input
                      type="text"
                      name="description"
                      placeholder={todo.description}
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <div className="title-todo">{todo.description}</div>
                  )}
                  <Moment format="DD/MM/YYYY" className="text-muted">
                    {todo.createdAt}
                  </Moment>
                </label>
                {this.state.edit && this.state._id === todo._id ? (
                  <button
                    onClick={e => this.handleEdit(e, todo)}
                    className="btn btn-primary"
                  >
                    OK
                  </button>
                ) : (
                  <div className="dropdown">
                    <button
                      className="btn btn-outline dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src={more} alt="More options" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        onClick={() => this.handleOpenEdit(todo._id)}
                        className="dropdown-item"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => this.handleDelete(todo._id)}
                        className="dropdown-item"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default List;
