import React from "react"
import { Link } from "react-router-dom"
import BallotShowContainer from './BallotShowContainer'

const BallotTile = (props) => {
  const { id, name, stateId, subject, description } = props

  return (
    <div className="card text-center">
      <div className="card-body text-center">
        <h3 id="ballot-name">{name}</h3>
        <div className="card-subtitle mb-2 text-muted">
          <p id="ballot-subject">Subject: {subject}</p>
        </div>
        <p id="ballot-description">{description}</p>
        <Link to={`/states/${stateId}/ballots/${id}`}>
        <div className="btn btn-secondary">Get Involved</div>
        </Link>
      </div>
    </div>
  )
}

export default BallotTile
