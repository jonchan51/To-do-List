Rails.application.routes.draw do
  get 'users/new'
  get 'welcome/index'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  resources :tasks
  resources :users

  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
