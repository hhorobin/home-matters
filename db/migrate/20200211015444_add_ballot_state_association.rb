class AddBallotStateAssociation < ActiveRecord::Migration[5.2]
  def change
    add_belongs_to :ballots, :state, null: false
  end
end
