class BallotShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :state_id, :signed_in

  has_many :events
  belongs_to :state

  def signed_in
    if scope
      scope
    else
      false
    end
  end

end
