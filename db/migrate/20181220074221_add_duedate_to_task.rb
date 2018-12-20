class AddDuedateToTask < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :duedate, :datetime
  end
end
