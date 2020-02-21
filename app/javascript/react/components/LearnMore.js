
import React, { useState } from "react";
import HorizontalBarChart from "./HorizontalBarChart";

function LearnMore() {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([
    {
      name: "1996",
      value: 93,
      color: "#986B6D"
    },
    {
      name: "2000",
      value: 76,
      color: "#365055"
    },
    {
      name: "2008",
      value: 59,
      color: "#c2b0c9"
    },
    {
      name: "2010",
      value: 50,
      color: "#6B6D99"
    },
    {
      name: "2014",
      value: 38,
      color: "#C9C5BF"
    },
    {
      name: "2016",
      value: 71,
      color: "#6D996B",
    },
    {
      name: "2018",
      value: 68,
      color: "#fcc169"
    }
  ]);

  return (
    <>
      <div className="bar-chart">
        <h3 className="text-center">Initiative Numbers Through the Years</h3>
        <HorizontalBarChart data={data} />
      </div>
    </>
  );
}

export default LearnMore;
