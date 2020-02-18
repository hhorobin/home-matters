import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import client from "./ApolloClient"

import StatesIndexContainer from "./StatesIndexContainer"
import StateShowContainer from "./StateShowContainer"
import BallotShowContainer from "./BallotShowContainer"
import ApproveEvents from "./ApproveEvents"
import UserEvents from "./UserEvents"

export const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StatesIndexContainer}/>
          <Route exact path="/states" component={StatesIndexContainer}/>
          <Route exact path="/states/:id" component={StateShowContainer}/>
          <Route exact path="/states/:state_id/ballots/:id" component={BallotShowContainer}/>
          <Route exact path="/events/edit" component={ApproveEvents}/>
          <Route exact path="/events" component={UserEvents}/>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
