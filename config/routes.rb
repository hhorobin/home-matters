Rails.application.routes.draw do
  root 'static_pages#index'

  get "/states/:state_id/ballots/:id/new", to: 'static_pages#create' #need?
  get "/events/edit", to: 'static_pages#update'
  get "/events", to: "static_pages#index"
  get "/", to: 'static_pages#index'
  get "/states", to: 'static_pages#index'
  get "/states/:id", to: 'static_pages#index'
  get "/states/:state_id/ballots/:id", to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :states, only: [:index, :show] do
        resources :ballots, only: [:index, :show] do
          resources :events, only: [:index, :create, :update]
        end
      end

      resources :events, only: [:index, :update] do
        resources :responses, only: [:create]
      end
    end
  end
end
