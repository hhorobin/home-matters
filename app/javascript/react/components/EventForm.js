import React, { useState } from "react"
import ErrorList from "./ErrorList"
import _ from "lodash"

const EventForm = (props) => {
  const { handleInputChange, handleSubmit, newEvent, errors } = props

  return(
    <div>
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
  )
}

export default EventForm;
