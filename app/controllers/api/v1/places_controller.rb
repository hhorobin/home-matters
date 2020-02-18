class Api::V1::PlacesController < ApplicationController

  def create
    address_object = Geocoder.search(params["_json"])
    coordinates = {latitude: address_object[0].data["lat"], longitude: address_object[0].data["lon"]}
    render json: coordinates
  end

end
