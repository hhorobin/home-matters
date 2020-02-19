class Api::V1::PlacesController < ApplicationController

  def create
    address_object = Geocoder.search(params["_json"])
    coordinates = {latitude: address_object[0].data["lat"], longitude: address_object[0].data["lon"]}
    latitude = coordinates[:latitude]
    longitude = coordinates[:longitude]

    response =HTTParty.get("https://openstates.org/api/v1/legislators/geo/?apikey=#{ENV["OPEN_STATES_KEY"]}&lat=#{latitude}&long=#{longitude}")

    result = response.map do |legislator|
      legislator
    end

    render json: result
  end
end
