import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

import BallotTile from "./BallotTile"

describe("BallotTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <BallotTile
          name="Great Ballot"
          subject="Improving the world"
          description="I will improve the world greatly."
        />
      </BrowserRouter>
    )
  })

  it("should render an h3 element containing the ballot name", () => {
    expect(wrapper.find("#ballot-name").text()).toBe("Referendum: Great Ballot")
  })

  it("should render an p element containing the ballot subject", () => {
    expect(wrapper.find("#ballot-subject").text()).toBe("Subject: Improving the world")
  })

  it("should render an p element containing the ballot description", () => {
    expect(wrapper.find("#ballot-description").text()).toBe("Details: I will improve the world greatly.")
  })
})
