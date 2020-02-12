class CreateResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :responses do |t|
      t.belongs_to :user, null: false
      t.belongs_to :event, null: false
    end
  end
end
