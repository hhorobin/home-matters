import React from "react"
import { Link } from "react-router-dom"
import BallotShowContainer from '../BallotShowContainer.js'

const BallotTile = (props) => {
  const { id, name, stateId, subject, description } = props

  return (
    <div className="row">
    <div className="col-md-11 card text-center ballot">
      <h3 id="ballot-name" className="p-2">{name}</h3>
      <div className="card-subtitle mb-2 text-muted">
        <p id="ballot-subject">Subject: {subject}</p>
        <p id="ballot-description" className="p-2">{description}</p>
      </div>
      <Link to={`/states/${stateId}/ballots/${id}`}>
        <div className="btn btn-secondary">Get Involved</div>
      </Link>
    </div>
    </div>
  )
}

export default BallotTile
