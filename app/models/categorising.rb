class Categorising < ApplicationRecord
  belongs_to :task
  belongs_to :category
end
