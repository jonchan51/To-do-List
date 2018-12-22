class Task < ApplicationRecord
  before_create { self.completed = 0 }
  has_many :categorisings, dependent: :delete_all
  has_many :categories, through: :categorisings
  validates :title, presence: true
  validates :duedate, presence: true 
  validate  :duedate_is_in_the_future?

  # formatted list of categories associated with task
  def category_list
    categories.map(&:name).join(', ')
  end

  # for _form. Selects categories to associate with task.
  def category_list=(ids)
    # to reject empty strings
    ids = ids.reject(&:empty?)
    self.categories = ids.map do |i|
      Category.find(i)
    end
  end

  # for _form. Checks whether category exists. Otherwise, make new.
  def new_category_list=(names)
    self.categories += names.split(',').map do |n|
      Category.where(name: n.downcase.strip.titleize).first_or_create!
    end
  end

  # find a way to factor this out, a bit repetitive
  def self.filter(category_id, completed)
    if category_id and category_id != ""
      Category.find(category_id).
        tasks.where(completed: completed).order(duedate: :asc)
    elsif completed
      Task.where(completed: completed).order(duedate: :asc)
    else
      Task.where(completed: 0).order(duedate: :asc)
    end
  end

  # duedate checks
  def duedate_is_in_the_future?
    if (duedate <=> DateTime.now) != 1
      errors.add(:duedate, 'must be in the future')
    end
  end
end
