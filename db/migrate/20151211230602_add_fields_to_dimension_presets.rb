class AddFieldsToDimensionPresets < ActiveRecord::Migration
  def change
    add_column :dimension_presets, :name, :string
    add_column :dimension_presets, :height, :integer
    add_column :dimension_presets, :width, :integer 
  end
end
