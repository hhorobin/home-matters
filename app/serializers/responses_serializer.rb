class ResponsesSerializer < ActiveModel::Serializer
  attributes :id, :event_id, :user_id, :current_user

  belongs_to :event
  belongs_to :user

  def current_user
    current_user?
  end
end
