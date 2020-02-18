// import React, { useState } from "react"
//
// const LocationFinder = () => {
//
//   const [ address, setAddress ] = useState("")
//
//   const [ coords, setCoords ] = useState({
//   })
//
//
//   const handleInputChange = (event) => {
//    setAddress(event.target.value)
//
//   }
//
//   const handleSubmit = () => {
//     event.preventDefault()
//     searchAddress(address)
//   }
//
//   const searchAddress = (address) => {
//       fetch(`/api/v1/places`, {
//         credentials: 'same-origin',
//         method: "POST",
//         body: JSON.stringify(address),
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(response => {
//         if (response.ok) {
//           return response
//         } else {
//           let errorMessage = `${response.status} (${response.statusText})`,
//           error = new Error(errorMessage)
//           throw error
//         }
//       })
//       .then(response => response.json())
//       .then(response => {
//         setCoords(response)
//       })
//       .catch(error => console.error(`Error in fetch: ${error.message}`));
//     }
//
//   return(
//     <div>
//       <form className="form-group" onSubmit={handleSubmit}>
//           <label>Find my legislators</label>
//           <input className="form-control" id="description" type="text" onChange={handleInputChange} value={address}></input>
//         <input id="submit" type="submit" />
//       </form>
//
//     </div>
//   )
// }
//
// export default LocationFinder
