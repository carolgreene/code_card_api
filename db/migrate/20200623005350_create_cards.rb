class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :front
      t.string :back
      t.string :deck_id
      t.timestamps
    end
  end
  
end
