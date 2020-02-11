class AddSubjectToBallots < ActiveRecord::Migration[5.2]
  def change
    add_column :ballots, :subject, :string, null: false
  end
end
