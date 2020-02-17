import React, { useState, useEffect } from "react"
import MapChart from "./MapChart"

const StatesIndexContainer = props => {

  return (
    <div>
      <h2 className='text-center landing'>Select Your State to Learn about Upcoming Ballot Referendums</h2>
      <div className="map">
        <MapChart
        />
      </div>
    </div>
  )
}

export default StatesIndexContainer;
