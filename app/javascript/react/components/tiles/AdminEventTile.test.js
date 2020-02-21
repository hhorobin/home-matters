import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

import AdminEventTile from "./AdminEventTile"
import ApproveEvents from "./ApproveEvents"

describe("AdminEventTile", () => {
  let wrapper, onClickMock

  beforeEach(() => {
    onClickMock = jest.fn()
    wrapper = mount(
      <BrowserRouter>
        <AdminEventTile
          title="An event to approve"
          description="All the details about the event."
          address="Central st"
          city="City"
          state="State"
          date="August 1st"
          time="10am"
          creatorContact="host@hotmail.com"
          onClick={onClickMock}
        />
      </BrowserRouter>
    )
  })

  it("should render an h3 element containing the event name", () => {
    expect(wrapper.find("#event-name").text()).toBe("An event to approve")
  })

  it("should render an p element containing the event details", () => {
    expect(wrapper.find(".event-details").text()).toBe("All the details about the event. Central st City, State August 1st 10am")
  })

  it("should render an p element containing the host contact info", () => {
    expect(wrapper.find("#contact-info").text()).toBe("Host contact info: host@hotmail.com")
  })

  xit('should invoke the event approval function from props when clicked', () => {
    let button = wrapper.find("#submit")
    console.log(button.debug())
    button.simulate("click")
    expect(onClickMock).toHaveBeenCalled()
  })
})
