class CreateCategorisings < ActiveRecord::Migration[5.2]
  def change
    create_table :categorisings do |t|
      t.references :task, foreign_key: true
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
