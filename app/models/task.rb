class Task < ApplicationRecord
  before_create { self.completed = 0 }
  has_many :categorisings, dependent: :delete_all
  has_many :categories, through: :categorisings
  has_many :subtasks, dependent: :delete_all
  validates :title, presence: true
  validates :duedate, presence: true 
  validate  :duedate_is_in_the_future?, on: :create

  # formatted list of categories associated with task
  def category_list
    categories.map(&:name).join(', ')
  end

  # repeat tasks daily for scheduler
  def self.repeat_tasks
    tasks = self.where(repeat: 1)
    tasks.each do |t|
      if t.completed
        t.duedate = Date.current.end_of_day.change(sec: 0)
        t.completed = 0
        t.subtasks.each do |s|
          s.completed = 0
          s.save
        end
        t.save
      end
    end
  end

  def priority_list 
    ['None', 'Low', 'Med', 'High']
  end

  def priority_level
    priority_list[self.priority]
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

  scope :priority_status, ->(level) { where(priority: level) if level.present? }
  scope :category_id, ->(id) { Category.find(id).tasks if id.present? }
  scope :status, ->(status) { where(completed: (status.present? ? status : 0)) }
  scope :date_group, ->(date_group) { 
    where("duedate <= ?", (date_group.blank? ? Date.today.end_of_day
            : 7.days.from_now.end_of_day)) unless date_group == 'Anytime' }

  # find a way to factor this out, a bit repetitive
  def self.filter(filtering_params)
    task = self.where(nil)
    if filtering_params.empty?
      task = task.where(completed: 0).where("duedate <= ?", Date.today.end_of_day)
    else
      filtering_params.each do |key, value|
        task = task.public_send(key, value)
      end
    end
    task = task.order(duedate: :asc, priority: :desc, title: :asc)
  end

  # duedate checks
  def duedate_is_in_the_future?
    if (duedate <=> DateTime.now) != 1
      errors.add(:duedate, 'must be in the future')
    end
  end
end
