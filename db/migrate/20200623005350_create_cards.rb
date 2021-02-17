class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.text :front
      t.text :back
      t.text :deck_id
      t.timestamps
    end
  end
  
end
