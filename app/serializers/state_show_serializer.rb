class StateShowSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :ballots
end
