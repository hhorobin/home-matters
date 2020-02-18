import ApolloClient from "apollo-boost"
import { gql } from "apollo-boost"

const client = new ApolloClient({
  uri: 'https://openstates.org/graphql',
  fetchOptions: {
    mode: 'no-cors',
  },
  request: operation => {
    operation.setContext({
      headers: {
        'X-API-KEY': 'a9408f37-20bd-41be-98ee-4c5b8e0d8079'
      }
    })
  }
})

client
  .query({
    query: gql`
      {
        people(latitude: 42.306900, longitude: -71.302120, first: 100) {
          edges {
            node {
              name
              contactDetails {
                type
                value
              }
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result))

  // const customQuery = `{
  //   people(latitude: 42.306900, longitude: -71.302120, first: 100) {
  //     edges {
  //       node {
  //         name
  //         contactDetails {
  //           type
  //           value
  //         }
  //       }
  //     }
  //   }
  // }`
  //
  // const openStatesRequest = (body) => {
  //   const url = "https://openstates.org/graphql"
  //   const headers = {'X-API-KEY': 'a9408f37-20bd-41be-98ee-4c5b8e0d8079', mode: 'no-cors'}
  //   return fetch(url, {
  //     method: 'POST',
  //     body: body,
  //     headers: headers
  //   })
  //   .then((res) =>
  //     { return res.json()
  //     })
  //   .then((body) => {
  //     console.log(body)
  //   })
  // }
  //
  // const getLegislators = () => {
  //   const query = customQuery
  //   let requestBody = {query: query}
  //
  //   requestBody.variables = { latitude: 42.306900, longitude: -71.302120}
  //
  //   return openStatesRequest(JSON.stringify(requestBody))
  // }
  //
  // getLegislators()

export default client
