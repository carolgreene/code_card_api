class Api::V1::UsersController < ApplicationController

  def index 
    users = User.all 
    render json: UserSerializer.new(users)
  end

  def show 
    user = User.find(params[:id])
    render json: UserSerializer.new(user)
  end

  def create 
    user = User.new(user_params)
    if user.save 
      render json: UserSerializer.new(user) 
    else 
      error_resp = {
        error: user.errors.full_messages.to_sentence
      }
      render json: error_resp, status: :unprocessable_entity
    end 
  end

  private 

  def user_params 
    params.require(:user).permit(:name, :password)
  end


end
