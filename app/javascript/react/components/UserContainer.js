import React, { useState, useEffect } from "react"

const UserContainer = (props) => {
  let userId = props.match.params.id
  useEffect(() => {
    fetch("/api/v1/users/${userId}")
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
    .then(body => {
      debugger
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  return(
    <div>
      <p>im a profile page</p>
    </div>
  )
}

export default UserContainer
