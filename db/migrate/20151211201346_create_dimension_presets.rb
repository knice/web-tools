class CreateDimensionPresets < ActiveRecord::Migration
  def change
    create_table :dimension_presets do |t|

      t.timestamps null: false
    end
  end
end
