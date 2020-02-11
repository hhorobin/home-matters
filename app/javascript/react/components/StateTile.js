import React from "react"
import { Link } from "react-router-dom"

const StateTile = (props) => {

  return (
    <div className="row">
      <p className="state-name">{props.name}</p>
    </div>
  )
}

export default StateTile;
