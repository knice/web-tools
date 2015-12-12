class DimensionsController < ApplicationController

  # respond_to :html

  def index
    @dimension = Dimension.new
  end

  def create
    @dimension = Dimension.new(dimension_params)
    @dimension.resize!

    respond_with @dimension do |format|
      format.html { redirect_to dimensions_path, notice: "Your resized image is being downloaded." }
    end
  end

  private

  def dimension_params
    params[:dimension].permit(
      :image_upload,
      :image_width,
      :image_height
    )
  end
end