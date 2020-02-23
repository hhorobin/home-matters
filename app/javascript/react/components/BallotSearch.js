import React from "react";

const BallotSearch = (props) => {
  const { handleInputChange, handleSubmit, query } = props

  return (
    <form onSubmit={handleSubmit} className="row mt-3 search-bar">
      <h5 className="mr-2 mt-1 search-text">Search for ballots by topic</h5>
      <input
        type="text"
        className="h-50"
        value={query.searchString}
        onChange={handleInputChange}
        >
      </input>
      <input className="search-button btn btn-light ml-3 mb-6 mt-0" type="submit" value="Search" />
    </form>
  )
}

export default BallotSearch
