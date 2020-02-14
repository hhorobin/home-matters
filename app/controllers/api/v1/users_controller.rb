class Api::V1::UsersController < ApplicationController

  def show
    user = current_user
    render json: user.events
  end

end
