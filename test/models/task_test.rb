require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  def setup
    @task = Task.new(title: "Run",
                     duedate: 1.hour.from_now)
  end

  test "duedate should be present" do
    @task.duedate = ""
    assert_not @task.valid?
  end

  test "duedate cannot be before current time" do
    @task.duedate = 1.hour.ago
    assert_not @task.valid?
  end
end
