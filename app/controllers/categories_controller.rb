class CategoriesController < ApplicationController
  def destroy
    @category = Category.find(params[:id])
    @category.destroy

    redirect_to tasks_path
  end
end
