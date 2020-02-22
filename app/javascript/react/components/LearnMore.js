
import React, { useState, useEffect } from "react"
import HorizontalBarChart from "./HorizontalBarChart"
import Hands from "../../../assets/images/Hands"
// import LineChart from "./LineChart"

const LearnMore = () => {
  const [ ballots, setBallots ] = useState([])
  // const [data, setData] = useState(
  //   Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  // );


  return (
    <>
    <div className="learn-more">
      <div className="container">
      <div className="row justify-content-center">
      <div className="definition text-center mt-2">
        <h4>Ballot Initiatives and Referendums</h4>
        <h6>Forms of direct democracy, allowing voters to propose new laws or reject existing ones</h6>
      </div>
      </div>
        <div className="row">

          <div className="col sm-3">
            <div className="bar-chart">
              <h5 className="text-center-dark">2020 Initiatives by the Issue</h5>
              <HorizontalBarChart />
            </div>
          </div>
          <div className="col sm-6">
          </div>
          <div className="col sm-3">
          <div class="quote-wrap quote-style-3">
            <blockquote>
                <p>A whole people with the ballot in their hands possess the most conclusive and unlimited power ever entrusted to humanity.</p>
            </blockquote>
              <div class="quote-attribution">
                <p class="quote-author">Herbert Hoover</p>
              </div>
          </div>
          </div>
        </div>
        </div>


      </div>
    </>
  )
}

// <div className="hand-pic">
//   <img src={Hands}/>
// </div>
export default LearnMore;
