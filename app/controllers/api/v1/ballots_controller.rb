class Api::V1::BallotsController < ApplicationController

  def index
    ballots = Ballot.all
    render json: ballots
  end

  def show
    state = State.find(params["state_id"])
    ballot = Ballot.find(params["id"])
    render json: ballot, serializer: BallotShowSerializer
  end

  def search
    ballots = Ballot.where("LOWER(subject) ILIKE ?", "%#{params["_json"]}%")
    if ballots == []
      render json: false
    else
      render json: ballots
    end
  end
end
