class Ballot < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :subject, presence: true

  belongs_to :state
  has_many :events

  def self.create_from_collection(ballots)
    ballots.each do |hash_array|
      hash_array.each do |hash|
        Ballot.create(state: hash[:state], name: hash[:name], subject: hash[:subject], description: hash[:description])
      end
    end
  end
end
