class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :date, null: false
      t.string :time, null: false
      t.belongs_to :ballot, null: false
    end
  end
end
