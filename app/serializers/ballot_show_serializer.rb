class BallotShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :state_id

  has_many :events
  belongs_to :state

end
