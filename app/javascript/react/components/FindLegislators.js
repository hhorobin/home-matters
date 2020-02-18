// import React from "react"
// import { useQuery, useLazyQuery } from "@apollo/react-hooks"
// import Legislator from "./Legislator"
//
//
// const FIND_LEGISLATORS_QUERY = gql `
//   query people($latitude: Float, $longitude: Float)
//   {
//     people(latitude: $latitude, longitude: $longitude, first: 100) {
//       edges {
//         node {
//           name
//           image
//           contactDetails {
//             type
//             value
//           }
//           chamber: currentMemberships(classification:["upper", "lower"]) {
//             post {
//               label
//             }
//             organization {
//               name
//               classification
//               parent {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
//
// export default function FindLegislators() {
//   const { data } = useQuery(FIND_LEGISLATORS_QUERY, {
//     variables: { latitude: 42.306900, longitude: -71.302120 },
//     suspend: false
//   })
//     return data.viewer.find
// }
