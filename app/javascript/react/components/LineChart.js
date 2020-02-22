import React, { useRef, useEffect, useState } from "react";
import { select, line, curveCardinal } from "d3";

function LineChart() {


  // 2000: 76
  // 2010: 50
  // 2008: 59
  // 2014: 38 
  // 2016: 71
  // 2018: 68
  const data = [{year: 1996, ballots: 93}, {year: 2000, ballots: 76}]
  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveCardinal);
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, []);

  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
}

export default LineChart;
