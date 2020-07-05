class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

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

  def update
    if user.update(user_params)
      render json: UserSerializer.new(user)
    else
      error_resp = {
        error: user.errors.full_messages.to_sentence
      }
      render json: error_resp, status: :unprocessable_entity
    end
  end

  def destroy
    users = User.all
    user.destroy
    render json: UserSerializer.new(users)
  end

  private 

  def set_user 
    user = User.find(params[:id])
  end

  def user_params 
    params.require(:user).permit(:name, :password)
  end


end
