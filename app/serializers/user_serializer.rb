class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :password_digest
  has_many :decks, serializer: DeckSerializer
  #has_many :cards, through: :decks, serializer: CardSerializer
  
  
end
