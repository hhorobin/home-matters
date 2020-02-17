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

  def alert_host
    event = Event.find(params[:id])
    user = event.creator
    if event.users.include?(current_user)
      render json: { event: event, message: "You have already RSVPed to this event!"}
    else
      event.responses
      message = "RSVP alert from Home Matters! You have a new attendee for #{event.title}"
      TwilioClient.new.send_text(user, message)
      render json: { event: event, message: "We'll let the host know to expect you!"}
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

  def destroy
    event = Event.find(params["id"])
    if current_user.admin?
      event.destroy
      render json: Event.where(approved: false)
    else
      render json: false
    end
  end

  def event_params
    params.require(:event).permit(:title, :description, :address, :city, :state, :date, :time, :approved)
  end
end
