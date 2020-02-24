import React, { useState } from "react"
import ErrorList from "./ErrorList"
import _ from "lodash"

const EventForm = (props) => {
  const { handleInputChange, handleSubmit, newEvent, errors, signedIn } = props

  let className = "post"
  let message = ""
  if(signedIn === false){
    className = "hidden"
    message = "Are you or your organization hosting an event about this issue? Sign in to post your event and connect with passionate volunteers"
  }

  return(
    <div>
      <h3 className="action-call text-center">{message}</h3>
      <div className={className}>
        <div className="container post text-center">
          <h3 className="action-call text-center">Are you or your organization hosting an event about this issue? Submit the details here and connect with passionate volunteers.</h3>
          <button type="button" className="btn-lg btn-secondary text-center add-event" data-toggle="modal" data-target="#formModal">
          Post an Event
          </button>
        </div>
        <div className="modal fade bd-modal-lg" id="formModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg event-modal" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tell us about your event.</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
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

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EventForm;
