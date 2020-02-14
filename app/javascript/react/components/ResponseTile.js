import React from "react"

const ResponseTile = (props) => {

  const handleResponseClick = event => {
    event.preventDefault()
    props.addResponse()
  }

  return(
    <div>
      <input id="submit" type="submit" value="I'm going!" onClick={handleResponseClick}/>
    </div>
  )
}

export default ResponseTile