class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :password_digest
end
