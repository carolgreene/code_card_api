class DeckSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :user_id
  has_many :cards, serializer: CardSerializer
end
