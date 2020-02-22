import React, { useRef, useEffect } from "react"
import { select, scaleBand, scaleLinear, max } from "d3"
import useResizeObserver from "./useResizeObserver"
import allSubjects from "./allsubjects.json"

const HorizontalBarChart = () => {
  const data = allSubjects
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const padding = {top: 60, right: 60, bottom: 60, left: 60}
  const width = 800

  useEffect(() => {
    const svg = select(svgRef.current)
    if (!dimensions) return

    const yScale = scaleBand()
    .domain(d3.range(30))
    .rangeRound([0, width])
    .paddingInner(0.5);

    const xScale = scaleLinear()
      .domain([0, max(data, entry => entry.count)])
      .range([0, dimensions.width])

    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", "red")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", 20)
      // .attr("padding", padding.top)
      .attr('marginBottom', `60`)
      .transition()
      .attr("width", entry => xScale(entry.count))
      .attr("y", (entry, index) => yScale(index));

    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join(enter =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => `${entry.name}: ${entry.count}`)
      .attr("class", "label")
      .attr("x", 10)
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
