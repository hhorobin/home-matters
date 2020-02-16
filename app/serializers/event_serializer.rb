class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :creator_contact, :address, :city, :state, :date, :time, :creator, :users, :responses, :ballot_id, :approved

  has_many :responses
  has_many :users, through: :responses
  belongs_to :ballot

  def creator_contact
    object.creator.email
  end
end
