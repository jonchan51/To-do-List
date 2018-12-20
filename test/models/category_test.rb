require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(name: "Run")
  end

  test "name should be present" do
    @category.name = ""
    assert_not @category.valid?
  end

  test "name should be unique" do
    dup_category = @category.dup
    dup_category.name = @category.name.upcase
    @category.save
    assert_not dup_category.valid?
  end

  test "name should be saved in correct format" do
    @category.name = "rUn"
    @category.save
    assert @category.name == "Run"
  end
end
