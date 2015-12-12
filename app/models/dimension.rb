class Dimension
  include ActiveModel::Model

  attr_accessor(
    :image_upload,
    :image_width,
    :image_height
  )

  validates :image_upload, presence: true
  validates :image_width, presence: true
  validates :image_height, presence: true

  def resize!
    if valid?
      image = MiniMagick::Image.open(self.image_upload.path)
      # resize_str = self.image_width.to_s + "x"
    end
  end
end