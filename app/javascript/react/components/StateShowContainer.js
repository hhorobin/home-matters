import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import BallotTile from './BallotTile'
import LegislatorTile from './LegislatorTile'

const StateShowContainer = (props) => {
  const [ stateBallots, setStateBallots ] = useState([])
  const [ stateName, setStateName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ legislators, setLegislators ] = useState([])

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
        setLegislators(response)
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

  const legislatorTiles = legislators.map((legislator) => {
    return(
      <LegislatorTile
        key={legislator.leg_id}
        name={legislator.full_name}
        email={legislator.email}
        photo={legislator.photo_url}
        party={legislator.party}
        district={legislator.district}
      />
    )
  })

  return (
    <>
      <div className="row text-center">
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
            <div className="card legislators">
              <p>Passionate about these measures?</p>
              <a data-toggle="collapse" href="#collapseContact" aria-expanded="false" aria-controls="collapseContact">Contact my Legislators</a>
              <div className="collapse" id="collapseContact">
                <form className="form-group">
                  <input className="form-control text-center" id="address" type="text" placeholder="Street, City, State" onChange={handleInputChange} value={address}></input>
                </form>
                <input className="btn btn-light btn-sm" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap" onClick={handleSubmit} value="Search" readOnly={true}/>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title-center" id="exampleModalLongTitle">Your Representatives:</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
            <div className="modal-body">
              {legislatorTiles}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StateShowContainer
