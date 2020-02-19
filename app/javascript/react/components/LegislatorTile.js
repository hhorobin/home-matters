import React, { useState } from "react"

const LegislatorTile = (props) => {

  const { name, email, photo, party, district } = props
  return(
    <div>
      <ul className="text-center">
        <h2>{name}</h2>
        <h4>{email}</h4>
        <img src={photo} height="60" width="60"/>
        <h6>District: {district}</h6>
        <h6>Affiliation: {party}</h6>
      </ul>
    </div>
  )
}

export default LegislatorTile
