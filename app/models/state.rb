class State < ApplicationRecord
  validates :name, presence: true

  has_many :ballots
  #make a constant ABBREVIATIONS = write them all out. it would be a hash with key value abbrev, full name
  #or enumerable. store the state as abbreviation and then access it via full name
end
