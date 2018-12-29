class TasksController < ApplicationController
  def index
    filter_cookies
    @tasks = Task.filter(filtering_params(params))
  end

  def show
    @task = Task.find(params[:id])
  end

  def new
    @task = Task.new
    @task.priority = 0
  end

  def edit
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      redirect_to @task
    else
      render 'new'
    end
  end

  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      redirect_to @task
    else
      render 'edit'
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    redirect_to tasks_path
  end

  def toggle
    @task = Task.find(params[:id])
    @task.update_attributes(completed: params[:completed])

    redirect_to tasks_path
  end
  
  private
    def task_params
      params.require(:task).permit(:title, :duedate, :repeat,
                                   { :category_list => [] }, 
                                   :new_category_list, :completed,
                                   :comments, :priority)
    end

    def filter_cookies
      filter_vars = [:category_id, :date_group, :status, :priority_status]
      filter_vars.each do |key|
        if params[key]
          cookies[key] = { value: params[key], expires: 1.day.from_now }
        elsif cookies[key]
          params[key] = cookies[key]
        end
      end
    end

    def filtering_params(params)
      params.slice(:category_id, :date_group, :status, :priority_status)
    end
end
