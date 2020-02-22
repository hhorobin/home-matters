import React, { useRef, useEffect } from "react"
import { select, scaleBand, scaleLinear, max } from "d3"
import useResizeObserver from "./useResizeObserver"
import allSubjects from "./allsubjects.json"

const HorizontalBarChart = () => {
  const data = allSubjects
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const width = 1000

  useEffect(() => {
    const svg = select(svgRef.current)
      .attr("viewBox", `0 0 380 500`)
    if (!dimensions) return
    const yScale = scaleBand()
    .domain(d3.range(data.length * 2))
    .rangeRound([0, width])
    .paddingInner(0.4);

    const xScale = scaleLinear()
      .domain([0, max(data, entry => entry.count)])
      .range([0, dimensions.width])

    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth() + 6)
      .transition()
      .attr("width", entry => xScale(entry.count))
      .attr("y", (entry, index) => yScale(index))
      .attr("fill", function(data, i) {
    return "rgb(40, 95, " + (i * 10) + ")"

})

    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth()
          )
      )
      .text(entry => `${entry.name}: ${entry.count}`)
      .attr("class", "label")

      .attr("x", 2)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions])

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg className="svg" ref={svgRef}></svg>
    </div>
  )
}

export default HorizontalBarChart
