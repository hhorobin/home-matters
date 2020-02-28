import React, { useState } from "react"
import { Link } from "react-router-dom"
import MapChart from "./MapChart"
import BallotSearch from "./BallotSearch"
import BallotTile from "./tiles/BallotTile.js"
import LearnMore from "./LearnMore"

const StatesIndexContainer = props => {
  const [ ballots, setBallots ] = useState([])
  const [ className, setClassName ] = useState("bg")
  const [ options, setOptions ] = useState([])
  const [ searchResults, setSearchResults ] = useState([])
  const [ query, setQuery ] = useState({
    ballots: [],
    searchString: ""
  })
  const [ noBallots, setNoBallots ] = useState(false)

  const handleInputChange = (event) => {
    setQuery({
      ...query,
      searchString: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    searchBallots(query.searchString)
    window.scrollTo(0, 0)
    setQuery({
      ballots: [],
      searchString: ""
    })
  }

  const searchBallots = (formPayload) => {
    fetch(`/api/v1/ballots/search.json`, {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formPayload)
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
        setSearchResults(response)
        setClassName("hidden")
      }
      else
        noBallotsFound()
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const searchLinks = searchResults.map((result) => {
    return(
      <div className="row justify-content-center">
        <Link to={`/states/${result.state_id}/ballots/${result.id}`}>
          {result.name}
        </Link>
      </div>
    )
  })

  const noBallotsFound = () => {
    setNoBallots("No ballot topics matched that search.")
  }

  return (
    <div>
      <div className={className}>
        <div className="welcome">
          <p>Choose your state to learn about upcoming ballot initiatives and referendums</p>
          <Link className="mobile-link" to="/learn">
            What's a ballot initiative?
          </Link>
        </div>
        <div className="text-right">
        </div>
        {noBallots &&
        <div class="alert w-50 no-ballots text-center" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          {noBallots}
          </div>}
        <div className="map">
          <MapChart
          />
        </div>
        <div className="text">
          <h1>Home</h1><span>✓</span><h1>Matters</h1>
          <p>Choose your state to learn about upcoming ballot initiatives and referendums</p>
          <Link className="text-white" to="/learn">
            What's a ballot initiative?
          </Link>
        </div>
        <div className="row search text-center">
          <div className="col-sm-6">
          <BallotSearch
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            query={query}
          />
          </div>
        </div>
      </div>
      <div className="text-center search-results">
        {searchLinks}
      </div>
    </div>
  )
}

export default StatesIndexContainer
