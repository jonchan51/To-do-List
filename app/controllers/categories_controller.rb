class CategoriesController < ApplicationController
  def index
    @categories = Category.all.order(name: :asc)

    respond_to do |format|
      format.html
      format.js { 
        @categories = 
          Category.where("name LIKE ?", "%#{params[:search]}%").order(name: :asc)
      } 
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy

    redirect_to categories_path
  end
end
