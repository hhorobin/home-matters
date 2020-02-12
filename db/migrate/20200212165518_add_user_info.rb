class AddUserInfo < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :city, :string, null: false
    add_column :users, :state, :string, null: false
    add_column :users, :phone, :string, null: false
    add_column :users, :role, :string, null: false, default: "member"
  end
end
