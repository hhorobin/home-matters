import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import BallotTile from './BallotTile'

const StateShowContainer = (props) => {
  const [ stateBallots, setStateBallots ] = useState([])
  const [ stateName, setStateName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ coords, setCoords ] = useState({
  })

  let stateId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/states/${stateId}`)
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
    .then(response => {
      setStateName(response.state.name)
      setStateBallots(response.state.ballots)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, [])

  const ballotTiles = stateBallots.map((ballot) => {
    return(
      <BallotTile
        key={ballot.id}
        id={ballot.id}
        name={ballot.name}
        subject={ballot.subject}
        description={ballot.description}
        stateId={stateId}
      />
    )
  })

  const searchAddress = (address) => {
      fetch(`/api/v1/places`, {
        credentials: 'same-origin',
        method: "POST",
        body: JSON.stringify(address),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
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
      .then(response => {
        setCoords(response)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  const handleInputChange = (event) => {
   setAddress(event.target.value)

  }

  const handleSubmit = () => {
    event.preventDefault()
    searchAddress(address)
    setAddress("")
  }
  console.log(coords)
  return (
    <div className="container text-center">
      <div className="row">
        <figure className="snip1104">
          <figcaption>
            <h2> Referendums in <span>{stateName}</span> </h2>
          </figcaption>
        </figure>
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col-6 ballot-tiles text-center">
          {ballotTiles}
          </div>
          <div className="col-2">
            <div className="card legislators">
              <p>Passionate about these measures?</p>
              <a data-toggle="collapse" href="#collapseContact" aria-expanded="false" aria-controls="collapseContact">Contact my Legislators</a>
              <div className="collapse" id="collapseContact">
                <form className="form-group"  onSubmit={handleSubmit}>
                  <input className="form-control" id="address" type="text" placeholder="Your address" onChange={handleInputChange} value={address}></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StateShowContainer
