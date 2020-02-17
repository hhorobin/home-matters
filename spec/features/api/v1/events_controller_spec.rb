require "rails_helper"

RSpec.describe Api::V1::EventsController, type: :controller do
  let!(:user_1) { FactoryBot.create(:user)}
  let!(:user_2) { FactoryBot.create(:user)}
  let!(:admin_user) { FactoryBot.create(:admin_user) }

  let!(:first_state) { State.create(
    name: "Colorado",
  ) }

  let!(:second_state) { State.create(
    name: "Connecticut",
  ) }

  let!(:first_ballot) { Ballot.create(
    name: "Colorado improvement",
    subject: "Improving",
    description: "It will improve Colorado",
    state_id: first_state.id
  ) }

  let!(:first_event) { Event.create(
    title: "Support the Ballot",
    description: "We will get it to pass",
    address: "Main street",
    city: "Boulder",
    state: "CO",
    date: "October 4",
    time: "1pm" ,
    ballot_id: first_ballot.id,
    creator_id: user_1.id
  )}

  let!(:second_event) { Event.create(
    title: "Dont Support the Ballot",
    description: "We do not want it to pass",
    address: "Central street",
    city: "Denver",
    state: "CO",
    date: "November 3",
    time: "2pm" ,
    ballot_id: first_ballot.id,
    creator_id: user_2.id
  )}

  let!(:third_event) { Event.create(
    title: "Make it happen!",
    description: "Collect signatures",
    address: "Washington street",
    city: "Colorado Springs",
    state: "CO",
    date: "April 4",
    time: "10am" ,
    ballot_id: first_ballot.id,
    creator_id: user_1.id,
    approved: true
  )}

  let!(:response_one) {Response.create(
    user_id: user_2.id,
    event_id: third_event.id
  )}

  describe "GET#index" do
    context "when the signed-in user is an admin" do
      it "if the user is an admin, it should display all the unapproved parks" do
        sign_in admin_user

        get :index

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json["events"].length).to eq 2

        expect(returned_json["events"][0]["title"]).to eq "Support the Ballot"

        expect(returned_json["events"][1]["title"]).to eq "Dont Support the Ballot"
      end
    end

    context "when the signed-in user is a member" do
      it "should display the events that member is attending" do
        sign_in user_2

        get :index

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json["events"].length).to eq 1
        expect(returned_json["events"][0]["title"]).to eq "Make it happen!"
      end
    end
  end

  describe "POST#create" do
    context "when a user is signed in and provides proper review params" do
      let!(:new_event) {{
        title: "World Peace Ballot",
        description: "Promote world peace",
        address: "Peace Ave",
        city: "Peace city",
        state: "PE",
        date: "August 10",
        time: "8am" ,
        ballot_id: first_ballot.id,
        creator_id: user_1.id,
      }}

      it "adds a new event to the database" do
        sign_in user_1

        prev_count = Event.count

        post :create, params: { state_id: first_state.id, ballot_id: first_ballot.id, event: new_event, format: :json }

        expect(Event.count).to eq(prev_count + 1)
      end

      it "returns the new event as JSON" do
        sign_in user_1

        post :create, params: { state_id: first_state.id, ballot_id: first_ballot.id, event: new_event, format: :json }

        response_body = JSON.parse(response.body)

        expect(response_body["event"]["title"]).to eq "World Peace Ballot"
        expect(response_body["event"]["approved"]).to eq false
      end
    end

    context "when a user submits review without required params" do
      let!(:incomplete_event) {{
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        date: "",
        time: "" ,
        ballot_id: first_ballot.id,
        creator_id: user_2.id,
      }}

      it "adds does not add the new review to the database" do
        sign_in user_2

        prev_count = Event.count

        post :create, params: { state_id: first_state.id, ballot_id: first_ballot.id, event: incomplete_event, format: :json }

        expect(Event.count).to eq(prev_count)
      end
    end
  end

  describe "PATCH#update" do
    context "when an admin is signed in and approves an event" do
      it "should update the event to be approved" do
        sign_in admin_user

        unapproved_event = second_event

        updated_event = {
            id: unapproved_event["id"],
            title: unapproved_event["title"],
            description: unapproved_event["description"],
            address: unapproved_event["address"],
            city: unapproved_event["city"],
            state: unapproved_event["state"],
            date: unapproved_event["date"],
            time: unapproved_event["time"],
            ballot_id: unapproved_event["ballot_id"],
            creator_id: unapproved_event["creator_id"],
            approved: true,
        }

        put :update, params: updated_event, format: :json

        event = Event.find(unapproved_event["id"])
        expect(event.approved).to eq true
      end
    end
  end

  describe "DELETE#destroy" do
    context "when ad admin declines an event" do
      let!(:event_to_delete) {{
        title: "Delete this",
        description: "It should get deleted",
        address: "West street",
        city: "Colorado Springs",
        state: "CO",
        date: "February 3",
        time: "8am" ,
        ballot_id: first_ballot.id,
        creator_id: user_1.id,
      }}

       it "should delete the event" do
         sign_in admin_user

         post :create, params: { state_id: first_state.id, ballot_id: first_ballot.id, event: event_to_delete, format: :json }

         prev_count = Event.count
         delete_params = JSON.parse(response.body)["event"]
         delete :destroy, params: delete_params, format: :json
         new_count = Event.all.length

         expect(new_count).to eq(prev_count - 1)
       end
     end
   end
end
