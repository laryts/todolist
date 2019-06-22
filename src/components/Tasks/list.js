import React, { Component } from "react";
import api from "../../services/api";

import "./list.scss";

import more from "../../assets/more.svg";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  async componentDidMount() {
    const response = await api.get("todos");

    this.setState({ list: response.data });
  }

  handleItemClick = ({ _id, description, done, createdAt }) => {
    // Checkbox update state
    this.setState({
      list: this.state.list.map(todo =>
        todo._id === _id ? { _id, description, done: !done, createdAt } : todo
      )
    });

    // Send checkbox update to API
    api.put(`/todos/${_id}`, { done: !done });
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.term.length > 0) {
      this.setState({
        term: "",
        list: [...this.state.list, { value: this.state.term, done: false }]
      });
    }
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
        <div className="list-group">
          {this.state.list.map((todo, index) => (
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
                  <div className="title-todo">{todo.description}</div>
                  <small className="text-muted">{todo.createdAt}</small>
                </label>
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
                      onClick={() => this.handleEdit(todo._id)}
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
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default List;
