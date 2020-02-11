import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"

Enzyme.configure({ adapter: new Adapter() })

import StateShow from "./StateShow"

describe("StateShow", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <StateShow
          stateName="I am a Fake State"
        />
      </BrowserRouter>
    )
  })

  it("should render an h2 element containing the state name", () => {
    expect(wrapper.find(".state-show-name").text()).toBe("I am a Fake State")
  })
})
