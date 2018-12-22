class AddCommentsToTask < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :comments, :text
  end
end
