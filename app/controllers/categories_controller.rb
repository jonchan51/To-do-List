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

  def create
    @category = Category.new(category_params)

    if @category.save
      redirect_to categories_path
    end
  end

  def update
    @category = Category.find(params[:id])
    respond_to do |format|
      format.js {
        @category.update(name: params[:name])
        redirect_to categories_path
      }
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy

    redirect_to categories_path
  end

  private
    def category_params
      params.require(:category).permit(:name)
    end
end
