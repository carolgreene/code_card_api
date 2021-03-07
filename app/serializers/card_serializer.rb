class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :front, :back, :deck_id
  belongs_to :deck
  #belongs_to :user
end
