import React from "react"

const ResponseTile = (props) => {

  const handleResponseClick = event => {
    event.preventDefault()
    props.sendHostText()
  }

  const handleListClick = event => {
    event.preventDefault()
    props.addResponse()
  }

  return(
    <div>
      <input id="submit" type="submit" value="I'm going!" onClick={handleResponseClick}/>
      <input id="submit" type="submit" value="Add this to my list!" onClick={handleListClick}/>
    </div>
  )
}

export default ResponseTile
