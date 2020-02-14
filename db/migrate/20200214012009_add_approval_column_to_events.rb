class AddApprovalColumnToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :approved, :boolean, null: false, default: false
  end
end
