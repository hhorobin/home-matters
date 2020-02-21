import React from "react";

const BallotSearch = (props) => {
  const { handleInputChange, handleSubmit, query } = props

  return (
    <form onSubmit={handleSubmit} className="row mt-3 search-bar">
      <h4 className="mr-2 mt-1">Search for ballots by topic</h4>
      <input
        type="text"
        value={query.searchString}
        onChange={handleInputChange}
        >
      </input>
      <div>
        <input className="btn-lg btn-light ml-3" type="submit" value="Search" />
      </div>
    </form>
  )
}

export default BallotSearch
