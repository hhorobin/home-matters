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

  describe "GET#index" do
    it "should return a list of all the ballots for the selected state" do
      get :index, params: { state_id: test_state.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json.class).to eq(Array)
      expect(returned_json.class).to_not eq(Hash)

      expect(returned_json[0]["name"]).to eq "A ballot in Michigan"
      expect(returned_json[0]["description"]).to eq "It will change lives in Michigan"
      expect(returned_json[0]["subject"]).to eq "Tests"
      expect(returned_json[1]["name"]).to eq "Another ballot in Michigan"
      expect(returned_json[1]["description"]).to eq "A great idea"
      expect(returned_json[1]["subject"]).to eq "Ideas"
    end
  end

  describe "GET#show" do
    it "should display the name and description only for the selected ballot" do
      get :index, params: { state_id: second_test_state.id, ballot_id: third_test_ballot.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json.class).to eq(Array)
      expect(returned_json.class).to_not eq(Hash)

      expect(returned_json[0]["name"]).to eq "A ballot in Arkansas"
      expect(returned_json[0]["description"]).to eq "Big changes in Arkansas!"
      expect(returned_json[0]["subject"]).to eq "Change"
    end
  end
end
