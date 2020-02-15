require "rails_helper"

RSpec.describe Api::V1::StatesController, type: :controller do
  let!(:test_state) { State.create(
    name: "California",
  )}
  let!(:second_test_state) { State.create(
    name: "Alabama",
  )}

  describe "GET#index" do
    it "should return a list of all the states" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json.class).to eq(Array)
      expect(returned_json.class).to_not eq(Hash)

      expect(returned_json[0]["name"]).to eq "California"
      expect(returned_json[1]["name"]).to eq "Alabama"
    end
  end
end
