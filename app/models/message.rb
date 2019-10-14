class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :image, ImageUploader
  validates :content_or_image, presence: true

  private

  def content_or_image
    content.presence or image.presence
  end
end
