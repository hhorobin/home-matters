class Api::V1::ResponsesController < ApplicationController
  
  def create
    event = Event.find(params["event_id"])
    response = Response.where(event: params[:event_id])
    response.create(
      event: event,
      user: current_user
    )
    binding.pry
    render json: event.responses.count
  end
end
