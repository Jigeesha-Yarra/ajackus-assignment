import React, { Component } from 'react';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import './App.css';

class App extends Component {
  state = {
    users: [],
    selectedUser: null,
    error: '',
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => this.setState({ users: data }))
      .catch((error) => this.setState({ error: 'Failed to fetch users.' }));
  }

  handleAddUser = (newUser) => {
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
    }));
  };

  handleEditUser = (updatedUser) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    }));
  };

  handleDeleteUser = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id),
    }));
  };

  render() {
    const { users, error } = this.state;

    return (
      <div className="app">
        <h1>User Management</h1>
        {error && <p className="error">{error}</p>}
        <UserTable
          users={users}
          onEditUser={(user) => this.setState({ selectedUser: user })}
          onDeleteUser={this.handleDeleteUser}
        />
        <UserForm
          selectedUser={this.state.selectedUser}
          onAddUser={this.handleAddUser}
          onEditUser={this.handleEditUser}
        />
      </div>
    );
  }
}

export default App;
