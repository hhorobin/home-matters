import React from "react"

const ResponseTile = (props) => {
  const handleResponseClick = event => {
    event.preventDefault()
    props.sendHostText()
    props.addResponse()
  }

  return(
    <div>
      <button type="submit" className="btn btn-dark btn-md" onClick={handleResponseClick}> I'm going! </button>
    </div>
  )
}

export default ResponseTile
