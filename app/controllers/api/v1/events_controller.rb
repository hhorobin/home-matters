class Api::V1::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user.admin?
      render json: Event.where(approved: false)
    else
      render json: current_user.events
    end
  end

  def create
    ballot = Ballot.find(params["ballot_id"])
    if user_signed_in?
      event = Event.new(event_params)
      event.ballot = ballot
      event.creator = current_user
      if event.save
        render json: { event: EventSerializer.new(event), message: "Your event has been submitted for approval!" }
      else
        render json: event.errors.full_messages.to_sentence
      end
    else
      render json: false
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

  def event_params
    params.require(:event).permit(:title, :description, :address, :city, :state, :date, :time, :approved)
  end
end
