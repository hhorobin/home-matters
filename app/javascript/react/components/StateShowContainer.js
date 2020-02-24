import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import BallotTile from './tiles/BallotTile'
import LegislatorTile from './tiles/LegislatorTile'

const StateShowContainer = (props) => {
  const [ stateBallots, setStateBallots ] = useState([])
  const [ stateName, setStateName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ legislators, setLegislators ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ noRepsFound, setNoRepsFound ] = useState(false)

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
        if (response) {
          setLegislators(response)
          setNoRepsFound(false)
          setLoading(false)
        }
        else {
          setLoading(false)
          setLegislators([])
          setNoRepsFound(true)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  const handleInputChange = (event) => {
   setAddress(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    searchAddress(address)
    setAddress("")
    setLoading(true)
  }

  const openModal = (event) => {
    event.preventDefault()
    searchAddress(address)
    setAddress("")
    setLoading(true)
    $('#exampleModal').modal('show')
  }

  let errorMessage
  if (noRepsFound) errorMessage = "We couldn't find any representatives for that address."

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
      <div className="bg">
        <div className="text sticky">
          <h1>Home</h1><span>✓</span><h1>Matters</h1>
          <Link className="text-black mt-3" to="/learn">
            What's a ballot initiative?
          </Link>
        </div>
        <div className="row text-center">
          <figure className="snip1104">
            <figcaption>
              <h1> Initiatives in <br/> <span>{stateName}</span> </h1>
            </figcaption>
          </figure>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col-6 ballot-tiles text-center">
            {ballotTiles}
            </div>
              <div className="card legislators">
                <p>Passionate about these issues?</p>
                <a data-toggle="collapse" href="#collapseContact" aria-expanded="false" aria-controls="collapseContact">Contact My Legislators</a>
                <div className="collapse" id="collapseContact">
                  <form onSubmit={openModal} className="form-group">
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
            <div className="modal-body info">
            {loading && <h5>Loading...</h5>}
              {legislatorTiles}
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default StateShowContainer
