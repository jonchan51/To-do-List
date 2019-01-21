Rails.application.routes.draw do
  get 'welcome/index'

  resources :tasks do
    resources :subtasks, only: [:index, :new, :create]
  end

  resources :subtasks, only: [:show, :edit, :update, :destroy] do
  end

  resources :categories, only: [:index, :destroy, :create, :update]

  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
