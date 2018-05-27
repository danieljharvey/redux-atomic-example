import * as React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./Store";

import { UserFormContainer } from "./user/userForm";
import { UserListContainer } from "./user/userList";

import { UserAdvancedFormContainer } from "./user-advanced/userAdvancedForm";
import { UserAdvancedListContainer } from "./user-advanced/userAdvancedList";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Redux Atomic Example</h1>
          </header>
          <h2>Basic reducer</h2>
          <UserFormContainer />
          <UserListContainer />
          <hr />
          <h2>Advanced reducer</h2>
          <UserAdvancedFormContainer />
          <UserAdvancedListContainer />
          <hr />
        </div>
      </Provider>
    );
  }
}

export default App;
