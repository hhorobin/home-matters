class State < ApplicationRecord
  validates :name, presence: true

  has_many :ballots
end
