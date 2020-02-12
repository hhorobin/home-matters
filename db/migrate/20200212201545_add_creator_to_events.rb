class AddCreatorToEvents < ActiveRecord::Migration[5.2]
  def change
    add_reference :events, :creator, index: true, null: false
  end
end
