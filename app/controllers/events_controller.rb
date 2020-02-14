class EventsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user.admin?
      render json: Event.where(approved: false)
    else
      render json: current_user.events
    end
  end

  def update
    event = Event.find(params["id"])
    if current_user.admin?
      event.approved = true
      event.save!
      render json: Event.where(approved: false)
    else
      render json: false
    end
  end
end
