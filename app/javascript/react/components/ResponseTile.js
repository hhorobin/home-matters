import React from "react"

const ResponseTile = (props) => {
  const handleResponseClick = event => {
    event.preventDefault()
    props.addResponse()
    props.sendHostText()
  }

  return(
    <div>
      <button type="submit" class="btn btn-dark btn-md" onClick={handleResponseClick}> I'm going! </button>
    </div>
  )
}

export default ResponseTile
