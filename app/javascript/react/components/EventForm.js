import React, { useState } from "react"
import ErrorList from "./ErrorList"
import _ from "lodash"

const EventForm = (props) => {
  const { handleInputChange, handleSubmit, newEvent, errors } = props

  return(
    <div>
      <div className="container post text-center">
        <h3 className="action-call text-center">Are you or your organization hosting an event? Submit the details here and connect with passionate volunteers.</h3>
        <button type="button" className="btn-lg btn-secondary text-center post" data-toggle="modal" data-target="#formModal">
        Post an event
        </button>
      </div>
      <div class="modal fade bd-modal-lg" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">Tell us about your event.</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div className="event-form">
                <form id="new-event" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Event Name</label>
                    <input className="form-control" type="text" id="title" onChange={handleInputChange} value={newEvent.title}/>
                  </div>

                  <div className="form-group">
                    <label >Description</label>
                    <textarea className="form-control" id="description" rows="3" onChange={handleInputChange} value={newEvent.description}></textarea>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input className="form-control" type="text" id="address" onChange={handleInputChange} value={newEvent.address}/>
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input className="form-control" type="text" id="city" onChange={handleInputChange} value={newEvent.city}/>
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input className="form-control" type="text" id="state" onChange={handleInputChange} value={newEvent.state}/>
                  </div>

                  <div className="form-group">
                    <label>Date</label>
                    <input className="form-control" type="text" id="date" onChange={handleInputChange} value={newEvent.date}/>
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <input className="form-control" type="text" id="time" onChange={handleInputChange} value={newEvent.time}/>
                  </div>
                  <input id="submit" type="submit" />
                  <ErrorList
                  errors={errors}
                  />
                </form>
              </div>
            </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default EventForm;
