import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"

import StatesIndexContainer from "./StatesIndexContainer"
import StateShowContainer from "./StateShowContainer"
import BallotShowContainer from "./BallotShowContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StatesIndexContainer}/>
        <Route exact path="/states" component={StatesIndexContainer}/>
        <Route exact path="/states/:id" component={StateShowContainer}/>
        <Route exact path="/states/:id/ballots/:id" component={BallotShowContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
