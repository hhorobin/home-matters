
import React, { useState, useEffect } from "react"
import HorizontalBarChart from "./HorizontalBarChart"
import Hands from "../../../assets/images/Hands"
import LineChart from "./LineChart"

const LearnMore = () => {
  const [ ballots, setBallots ] = useState([])
  // const [data, setData] = useState(
  //   Array.from({ length: 50 }, () => Math.round(Math.random() * 100))
  // );

  return (
    <>
    <div className="learn-more">
      <div className="bar-chart">
        <h3 className="text-center">2020 Referendums by the Issue</h3>
        <HorizontalBarChart />
      </div>
      <LineChart
      />
    </div>

    </>
  )
}

// <div className="hand-pic">
//   <img src={Hands}/>
// </div>
export default LearnMore;
