import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

import LegislatorTile from "./LegislatorTile"

describe("LegislatorTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <LegislatorTile
          name="Your Local Rep"
          email="contact@email.com"
          photo="https://image.com"
          party="party"
          district="4"
        />
      </BrowserRouter>
    )
  })

  it("should render an h2 element containing the legislator's name", () => {
    expect(wrapper.find("h2").text()).toBe("Your Local Rep")
  })

  it("should render an img tag with the specific props", () => {
    expect(wrapper.find("img").props()["src"]).toEqual("https://image.com")
  })

  it("should render an h5 element containing the legislator's email", () => {
    expect(wrapper.find("h5").text()).toBe("contact@email.com")
  })

  it("should render an h6 element containing the legislator's district", () => {
    expect(wrapper.find("h6").text()).toBe("District: 4")
  })
})
