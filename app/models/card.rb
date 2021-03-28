class Card < ApplicationRecord
  validates_presence_of :front, :back  
  validates :front, uniqueness: { case_sensitive: false }

  belongs_to :deck
  #belongs_to :user
  
end

