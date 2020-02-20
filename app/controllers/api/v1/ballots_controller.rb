class Api::V1::BallotsController < ApplicationController

  def index
    ballots = Ballot.all
    render json: ballots
  end

  def subjects
    ballots = Ballot.all
    unique_subjects = ballots.uniq { |ballot| ballot[:subject] }
    subject_text = unique_subjects.map{ |ballot| ballot[:subject] }
    render json: subject_text
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
