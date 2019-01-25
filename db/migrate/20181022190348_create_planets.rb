class CreatePlanets < ActiveRecord::Migration[5.2]
  def change
    create_table :planets do |t|
      t.string :name
      t.string :image_url
      t.text :notes

      t.timestamps
    end
  end
end
