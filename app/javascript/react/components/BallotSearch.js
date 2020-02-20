import React from "react";

const BallotSearch = (props) => {
  const { handleInputChange, handleSubmit, query } = props

  return (
    <form onSubmit={handleSubmit} className="form-group text-center">
      <h6>Search for ballots by topic</h6>
      <input
        type="text"
        value={query.searchString}
        onChange={handleInputChange}
        >
      </input>
      <div>
        <input className="button" type="submit" value="Search" />
      </div>
    </form>
  )
}

export default BallotSearch
