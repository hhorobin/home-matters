class Place < ApplicationRecord
  attr_accessor :address, :latitude, :longitude
  geocoded_by :address
  after_validation :geocode
end
