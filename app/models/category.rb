class Category < ApplicationRecord
  before_save { self.name = name.downcase.upcase_first }
  has_many :categorisings
  has_many :tasks, through: :categorisings
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
