class Api::V1::ReviewsController < ApplicationController

  def index
    state = State.find(params["state_id"])
    render json: state.ballots
  end

end
