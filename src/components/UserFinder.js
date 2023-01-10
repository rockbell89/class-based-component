import { Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import ErrorBoundary from "./ErrorBoundary";
import UsersContext from "../store/users-context";

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };

    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }

  searchChangeHandler(event) {
    this.setState((prevState) => {
      return { searchTerm: event.target.value };
    });
  }

  componentDidMount() {
    this.setState((prevState) => {
      return { filteredUsers: this.context.users };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      console.log("componentDidUpdate");
      const updatedUsers = this.context.users.filter((user) =>
        user.name.includes(this.state.searchTerm)
      );
      console.log(updatedUsers);
      this.setState((prevState) => {
        return { filteredUsers: updatedUsers };
      });
    }
  }

  render() {
    return (
      <>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </>
    );
  }
}

export default UserFinder;
