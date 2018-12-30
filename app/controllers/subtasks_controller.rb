class SubtasksController < ApplicationController
  def new
    @task = Task.find(params[:task_id])
    @subtask = @task.subtasks.new
  end

  def edit
    @subtask = Subtask.find(params[:id])
  end

  def create
    @task = Task.find(params[:task_id])
    @subtask = @task.subtasks.new(subtask_params)

    if @subtask.save
      redirect_to task_path(@task)
    else
      render 'new'
    end
  end

  def update
    @subtask = Subtask.find(params[:id])

    respond_to do |format|
      format.html {
        if @subtask.update(subtask_params)
          redirect_to task_path(@subtask.task_id)
        else
          render 'edit'
        end
      }
      format.js { @subtask.update(completed: params[:completed]) }
    end
  end

  def destroy
    @subtask = Subtask.find(params[:id])
    @subtask.destroy

    redirect_to task_path(@subtask.task_id)
  end

  private
    def subtask_params
      params.require(:subtask).permit(:title, :completed)
    end
end
