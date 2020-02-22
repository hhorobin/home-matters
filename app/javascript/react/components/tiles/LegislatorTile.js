import React, { useState } from "react"

const LegislatorTile = (props) => {

  const { name, email, photo, district } = props
  return(
    <div className="row justify-content-center text-center">
      <ul className="text-center">
        <h2>{name}</h2>
        <img src={photo} height="80" width="80"/>
        <h5>{email}</h5>
        <h6>District: {district}</h6>
      </ul>
    </div>
  )
}

export default LegislatorTile
