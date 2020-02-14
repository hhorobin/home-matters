Rails.application.routes.draw do
  root 'static_pages#index'

  get "/states/:state_id/ballots/:id/new", to: 'static_pages#create'
  get "/", to: 'static_pages#index'
  get "/states", to: 'static_pages#index'
  get "/states/:id", to: 'static_pages#index'
  get "/states/:state_id/ballots/:id", to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :states, only: [:index, :show] do
        resources :ballots, only: [:index, :show]
      end

      resources :events, only: [] do
        resources :responses, only: [:create]
      end
    end
  end
end
