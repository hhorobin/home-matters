Rails.application.routes.draw do
  root 'static_pages#index'

  get "/", to: 'static_pages#index'
  get "/states", to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :states, only: [:index]
    end
  end

end
