import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"

Enzyme.configure({ adapter: new Adapter() })

import StateTile from "./StateTile"

describe("StateTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <StateTile
          name="Fake State"
        />
      </BrowserRouter>
    )
  })

  it("should render an p element containing the state name", () => {
    expect(wrapper.find(".state-name").text()).toBe("Fake State")
  })
})
