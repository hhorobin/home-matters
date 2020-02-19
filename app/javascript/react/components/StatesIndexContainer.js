import React, { useState, useEffect } from "react"
import MapChart from "./MapChart"

const StatesIndexContainer = props => {

  return (
    <div>
      <p className="welcome">Choose your state to learn about upcoming ballot referendums</p>
      <div className="bg">
        <div className="map">
          <MapChart
          />
        </div>
        <div className="text">
          <h1>Home</h1><span>✓</span><h1>Matters</h1>
          <p>Choose your state to learn about upcoming ballot referendums</p>
        </div>
        <p className="quote"> "A whole people with the ballot in their hands possess the most conclusive and unlimited power ever entrusted to humanity"<span>-Herbert Hoover</span></p>
      </div>
    </div>
  )
}

export default StatesIndexContainer;
