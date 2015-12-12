Rails.application.routes.draw do

  root 'dimensions#index'
  resources  :dimensions

end