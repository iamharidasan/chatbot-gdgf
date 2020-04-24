import React from "react"
import "./App.css"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import Landing from "./components/Landing/Landing"
import Login from "./components/auth/Login/Login"
import Dashboard from "./components/dashboard/Dashboard"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
