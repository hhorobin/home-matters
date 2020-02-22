
import React, { useState, useEffect } from "react"
import HorizontalBarChart from "./HorizontalBarChart"
import Hands from "../../../assets/images/Hands"
// import LineChart from "./LineChart"

const LearnMore = () => {
  const [ ballots, setBallots ] = useState([])

  return (
    <>

        <div className="container">
          <div className="justify-content-left">
            <div className="definition">
              <h4 className="question">So, what are initiatives and referendums?</h4>
            </div>
          </div>
          <div className="row">
            <div className="col sm-3">
              <div className="bar-chart">
                <h4 className="text-center">2020 Initiatives by the Issue</h4>
                <HorizontalBarChart />
              </div>
            </div>
          <div className="col sm-6">
          </div>
          <div className="col sm-3">
            <div className="quote-wrap quote-style-3">
              <blockquote>
                <p>A whole people with the ballot in their hands possess the most conclusive and unlimited power ever entrusted to humanity.</p>
              </blockquote>
                <div className="quote-attribution">
                  <p className="quote-author">Herbert Hoover</p>
                </div>
            </div>
          </div>
          </div>
        </div>

    </>
  )
}

//<h6>Forms of direct democracy, allowing voters to propose new laws or reject existing ones</h6>

export default LearnMore;
