import React, { useState, useEffect } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import { Link, Redirect } from "react-router-dom"

import allStates from "./allstates.json";
import StateTile from './StateTile'

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};
// where state.name = cur.id
const MapChart = () => {
  const [ states, setStates ] = useState([])
  const [ redirect, setRedirect ] = useState(false)
  const [ path, setPath ] = useState("")

  useEffect(() => {
    fetch("/api/v1/states")
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setStates(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const stateTiles = states.map(state => {
    return(
        <StateTile
          key={state.id}
          id={state.id}
          name={state.name}
        />
    )
  })
    const test = () => {
      const selectedState = states.find(state => state.name === event.target.innerHTML)
      setRedirect(true)
      setPath(`/states/${selectedState.id}`)
    }


    if(redirect === true) {
      return <Redirect to={path} />
    }



  // const selectedState = states.find(state => state.name === cur.id)

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#95A3A4"
              />
            ))}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);

              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={8} textAnchor="middle" onClick={test}>
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={8} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
