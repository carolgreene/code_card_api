class ApplicationController < ActionController::API
  before_action :authorized

  #Step 1. encode/decode tokens

  def encode_token(payload) 
    #store secret in env variable
    JWT.encode(payload, 'my_s3cr3t')
  end

  def auth_header 
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  #JWT.decode takes 3 arguments: a JWT as a string, an (have to look this up)
  def decoded_token 
    if auth_headertoken = auth_header.split(' ')[1]
      #header: {'Authorization': 'Bearer <token>'}
      #The Begin/Rescue syntax allows us to rescue out of an exception in Ruby.
      begin
        JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  #Step 2: Authentication helper methods
  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
    #returns a boolean instead of truthy user object
  end

  #Step 3: Authorization helper methods
  def authorized 
    render json: {message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end
