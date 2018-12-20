class Task < ApplicationRecord
  has_many :categorisings, dependent: :delete_all
  has_many :categories, through: :categorisings
  validates :title, presence: true

  def category_list
    categories.map(&:name).join(', ')
  end

  def category_list=(names)
    self.categories = names.split(',').map do |n|
      Category.where(name: n.strip).first_or_create!
    end
  end
end
