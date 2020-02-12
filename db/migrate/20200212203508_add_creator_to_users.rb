class AddCreatorToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :creator_id, :bigint, index: true
  end
end
