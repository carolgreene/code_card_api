Rails.application.routes.draw do
  namespace :api do
    namespace :V1 do
      resources :users
      resources :decks
      resources :cards
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
