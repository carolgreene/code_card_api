class Api::V1::UsersController < ApplicationController
  #remove :show from skip_before once authorization is working
  skip_before_action :authorized, only: [:create, :index, :show]
  before_action :set_user, only: [:show, :update, :destroy]

  def index 
    users = User.all     
    render json: users.to_json(:include => {
      :decks => {:except => [:created_at, :updated_at]}
    }), :except => [:created_at, :updated_at]
  end
  

  def create 
    @user = User.new(user_params)      
    if @user.save 
      @token = encode_token(user_id: @user_id)
      render json: { user: UserSerializer.new(@user), jwt: @token },
      status: :created      
    else 
      error_resp = {
        error: user.errors.full_messages.to_sentence
      }
      render json: error_resp, status: :unprocessable_entity
    end 
  end

  def show 
    user = User.find(params[:id])    
    render json: user.to_json(:include => {
      :decks => {:except => [:created_at, :updated_at]}      
    }), :except => [:created_at, :updated_at]
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
