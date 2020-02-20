Rails.application.routes.draw do
  root 'static_pages#index'

  get "/states/:state_id/ballots/:id/new", to: 'static_pages#create'
  get "/events/edit", to: 'static_pages#update'
  get "/events", to: "static_pages#index"
  get "/", to: 'static_pages#index'
  get "/states", to: 'static_pages#index'
  get "/ballots", to: 'static_pages#index'
  get "/states/:id", to: 'static_pages#index'
  get "/states/:state_id/ballots/:id", to: 'static_pages#index'
  post '/events/:event_id/alert_host', to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :states, only: [:index, :show] do
        resources :ballots, only: [:index, :show] do
          resources :events, only: [:index, :create]
        end
      end
      resources :places, only: [:create]
      resources :ballots, only: [:index] do
        member do
          get :subjects
        end
      end
      post "ballots/search", to: "ballots#search"
      resources :events, only: [:index, :update, :destroy] do
        member do
          post :alert_host
        end
        resources :responses, only: [:create]
      end
    end
  end
end
