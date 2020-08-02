import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from 'react-redux'



import Login from "./view/login/login";
import Signup from "./view/signup/sigup";
import Home from "./view/home/home";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
