class RemoveTextFromTask < ActiveRecord::Migration[5.2]
  def up
    remove_column :tasks, :text
  end

  def down
    add_column :tasks, :text, :text
  end
end
