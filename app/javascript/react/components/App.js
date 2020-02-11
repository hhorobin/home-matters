import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"

import StatesIndexContainer from "./StatesIndexContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StatesIndexContainer}/>
        <Route exact path="/states" component={StatesIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
