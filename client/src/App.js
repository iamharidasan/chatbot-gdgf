import React from "react"
import "./Bootstrap.css"
import "./App.css"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import Landing from "./components/Landing/Landing"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
