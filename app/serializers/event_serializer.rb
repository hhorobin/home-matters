class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :creator, :address, :city, :state, :date, :time, :creator, :users, :responses, :ballot_id

  has_many :responses
  has_many :users, through: :responses
  belongs_to :ballot
end
