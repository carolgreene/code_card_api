class ChangeNameToBeTextInUsers < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :name, :text
  end
end
