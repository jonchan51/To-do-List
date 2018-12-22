require 'test_helper'

class SubtaskTest < ActiveSupport::TestCase
  def setup
    @subtask = Subtask.new(title: "step 1", completed: 0)
  end

  test "title should be present" do
    @subtask.title = ""
    assert_not @subtask.valid?
  end
end
