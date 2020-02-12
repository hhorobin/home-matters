class EventSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :ballot_id, :name, :description, :address, :city, :state, :date, :body, :poster:, :logged_in_user

  belongs_to :user, if: :current_user?
  belongs_to :ballot

  def poster
    object.user.first_name
  end

  def current_user?
    object.user == scope
  end

  def logged_in_user
    if current_user?
      scope.first_name
    end
  end
end
