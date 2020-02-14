class Api::V1::ResponsesController < ApplicationController

  def create
    event = Event.find(params["event_id"])
    responses = Response.where(event: params[:event_id])
error = "error"
    if responses.where(user: current_user) == []
      Response.create(
        event: event,
        user: current_user
      )
      render json: responses
    else
      render json: responses
    end
  end

  def response_params
    params.require(:response)
  end
end
