class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :front, :back, :deck_id
end
