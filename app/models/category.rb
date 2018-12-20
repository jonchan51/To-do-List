class Category < ApplicationRecord
  has_many :categorisings
  has_many :tasks, through: :categorisings
end
