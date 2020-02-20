require "rails_helper"

RSpec.describe Api::V1::BallotsController, type: :controller do
  let!(:test_state) { State.create(
    name: "Michigan",
  )}
  let!(:second_test_state) { State.create(
    name: "Arkansas",
  )}
  let!(:test_ballot) { Ballot.create(
      name: "A ballot in Michigan",
      description: "It will change lives in Michigan",
      subject: "Tests",
      state_id: test_state.id
  )}
  let!(:second_test_ballot) { Ballot.create(
      name: "Another ballot in Michigan",
      description: "A great idea",
      subject: "Ideas",
      state_id: test_state.id
  )}
  let!(:third_test_ballot) { Ballot.create(
      name: "A ballot in Arkansas",
      description: "Big changes in Arkansas!",
      subject: "Change",
      state_id: second_test_state.id
  )}

  describe "GET#show" do
    it "should display the name of only the selected ballot" do
      get :show, params: { state_id: second_test_state.id, id: third_test_ballot.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.class).to eq(Hash)

      expect(returned_json["ballot"]["name"]).to eq "A ballot in Arkansas"
    end
  end
end
