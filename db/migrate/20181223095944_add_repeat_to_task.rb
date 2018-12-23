class AddRepeatToTask < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :repeat, :boolean
  end
end
