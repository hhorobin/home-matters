import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import { geoCentroid } from "d3-geo"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps"
import allStates from "./allstates.json"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

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
}

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

    const handleClick = () => {
      if (states.find(state => state.name === event.target.id)) {
        const selectedState = states.find(state => state.name === event.target.id)
        setRedirect(true)
        setPath(`/states/${selectedState.id}`)
      }
      else {
        window.alert("This state does not have any upcoming ballot initiatives.")
      }
    }

    if(redirect === true) {
      return <Redirect to={path} />
    }

  return (
    <div className="row">
      <div className="map">
        <div id="solid-map">
          <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies }) => (
                <>
                  {geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      stroke="black"
                      geography={geo}
                      id={geo.properties.name}
                      onClick={handleClick}
                      fill="#365055"
                      className="state-tile"
                    />
                  ))}
                  {geographies.map(geo => {
                    const centroid = geoCentroid(geo)
                    const cur = allStates.find(s => s.val === geo.id)
                    return (
                      <g key={geo.rsmKey + "-name"}>
                        {cur &&
                          centroid[0] > -160 &&
                          centroid[0] < -67 &&
                          (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                            <Marker className="svg_marker" coordinates={centroid}>
                              <text y="2" fontWeight="bold" fontSize={14} textAnchor="middle" >
                              {cur.id}
                              </text>
                            </Marker>
                          ) : (
                            <Annotation
                              className="annotation"
                              subject={centroid}
                              dx={offsets[cur.id][0]}
                              dy={offsets[cur.id][1]}
                            >
                              <text className="state-text" x={4} fontWeight="bold" fontSize={14} alignmentBaseline="middle" >
                                {cur.id}
                              </text>
                            </Annotation>
                          ))}
                      </g>
                    )
                  })}
                </>
              )}
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  )
}

export default MapChart;
