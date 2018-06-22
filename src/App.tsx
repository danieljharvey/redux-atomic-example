import * as React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./Store";

import { UserFormContainer } from "./user/userForm";
import { UserListContainer } from "./user/userList";

import { UserAdvancedFormContainer } from "./user-advanced/userAdvancedForm";
import { UserAdvancedListContainer } from "./user-advanced/userAdvancedList";

import { ValidatedFormContainer } from "./validated/validatedForm";
import { ValidatedListContainer } from "./validated/validatedList";

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to the basic Redux Atomic Example</h1>
          </header>
          <div style={{ padding: "20px" }}>
            <UserFormContainer />
            <UserListContainer />
          </div>
          <header className="App-header red">
            <h1 className="App-title">Welcome to the advanced Redux Atomic Example</h1>
          </header>
          <div style={{ padding: "20px" }}>
            <UserAdvancedFormContainer />
            <UserAdvancedListContainer />
          </div>
          <header className="App-header blue">
            <h1 className="App-title">Welcome to the very silly Redux Atomic Example</h1>
          </header>
          <div style={{ padding: "20px" }}>
            <ValidatedFormContainer />
            <ValidatedListContainer />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
