import React, { useState } from "react"

const LegislatorTile = (props) => {
  const { name, email, photo, district } = props

  return (
      <div className="text-center rep-tiles">
        <h2>{name}</h2>
        <img src={photo} className="rep-pic"/>
        <h5>{email}</h5>
        <h6>District: {district}</h6>
      </div>
  )
}

export default LegislatorTile
