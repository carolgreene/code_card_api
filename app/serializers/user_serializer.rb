class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :password_digest
  has_many :decks, serializer: DeckSerializer
  
  
end
