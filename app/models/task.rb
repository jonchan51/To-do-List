class Task < ApplicationRecord
  has_many :categorisings, dependent: :delete_all
  has_many :categories, through: :categorisings
  validates :title, presence: true

  # formatted list of categories associated with task
  def category_list
    categories.map(&:name).join(', ')
  end

  # for _form. Checks whether category exists. Otherwise, make new.
  def category_list=(names)
    self.categories = names.split(',').map do |n|
      Category.where(name: n.strip).first_or_create!
    end
  end

  def self.filter(category_id)
    if category_id and category_id != ""
      Category.find(category_id).tasks
    else
      all
    end
  end
end
