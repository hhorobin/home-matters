class Api::V1::BallotsController < ApplicationController

  def index
    state = State.find(params["state_id"])
    render json: state.ballots
  end

  def show
    state = State.find(params["state_id"])
    ballot = Ballot.find(params["id"])
    render json: ballot
  end

end
