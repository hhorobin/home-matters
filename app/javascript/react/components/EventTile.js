import React, { useState, useEffect } from "react"

const EventTile = props => {
  const { id, title, description, address, city, state, date, time, ballot_id, creator_id } = props



  return (
    <div>
      <h2>Event:{title}</h2>
      <p>{description}</p>
      <p>{address}</p>
      <p>{city}</p>
      <p>{state}</p>
      <p>{date}</p>
      <p>{time}</p>
    </div>
  )
}

export default EventTile;
