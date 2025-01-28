import React, { Component } from 'react';
import './UserForm.css'; 

class UserForm extends Component {
  state = {
    id: '',
    name: '',
    email: '',
    department: '',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUser !== this.props.selectedUser && this.props.selectedUser) {
      const { id, name, email, department } = this.props.selectedUser;
      this.setState({ id, name, email, department });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, email, department } = this.state;

    if (id) {
      this.props.onEditUser({ id, name, email, department });
    } else {
      this.props.onAddUser({ id: Date.now(), name, email, department });
    }

    this.setState({ id: '', name: '', email: '', department: '' });
  };

  render() {
    const { name, email, department } = this.state;

    return (
      <form className="user-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={this.handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={department}
          onChange={this.handleChange}
        />
        <button type="submit">{this.state.id ? 'Update User' : 'Add User'}</button>
      </form>
    );
  }
}

export default UserForm;
