import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

import UserEventTile from "./UserEventTile"

describe("UserEventTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <UserEventTile
          title="An event to go to"
          address="Main st"
          city="Town"
          date="November 1st"
          time="3pm"
          creatorContact="host@gmail.com"
        />
      </BrowserRouter>
    )
  })

  it("should render an h3 element containing the event name", () => {
    expect(wrapper.find("#event-name").text()).toBe("An event to go to")
  })

  it("should render an p element containing the event details", () => {
    expect(wrapper.find(".event-details").text()).toBe("Main st, Town November 1st 3pm")
  })

  it("should render an p element containing the host contact info", () => {
    expect(wrapper.find("#contact-info").text()).toBe("Can't make it? Contact host@gmail.com")
  })
})
