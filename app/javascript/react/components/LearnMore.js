import React, { useState, useEffect } from "react"
import HorizontalBarChart from "./HorizontalBarChart"

const LearnMore = () => {
  window.scrollTo(0,0)
  return (
    <>
      <div className="learn-container">
        <div className="justify-content-left">
          <div className="row">
            <a className="question">So, what are initiatives and referendums?</a>
            <div className="my-arrow">⇢</div>
            <h6 className="answer">Forms of direct democracy that allow citizens to propose new laws or reject existing ones</h6>
          </div>
        </div>

          <div className="row">
            <div className="col sm-3">
              <div className="bar-chart">
                <h4 className="text-center font-weight-bold">2020 Initiatives by the Issue</h4>
                <HorizontalBarChart />
              </div>
            </div>
            <div className="col sm-3">
              <div className='ui text-center'>
                <div className='ui_box'>
                <div className='ui_box__inner'>
                  <h2>
                    State Participation
                  </h2>
                  <div className='stat'>
                    <span>74%</span>
                  </div>
                  <div className='progress'>
                    <div className='progress_bar'></div>
                  </div>
                  <p>Percentage of states with initiatives and referendums this year.</p>
                </div>
              </div>

              <div className='ui_box'>
                <div className='ui_box__inner'>
                  <h2>
                    Voter Turnout
                  </h2>
                  <div className='stat'>
                    <span>⇡ 5%</span>
                  </div>
                  <p>Increase in voter turnout in states with initiatives and referendums compared to those without.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LearnMore;
