class Subtask < ApplicationRecord
  before_create { self.completed = 0 }
  belongs_to :task
  validates :title, presence: true
end
