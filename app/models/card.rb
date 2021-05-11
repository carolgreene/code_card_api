class Card < ApplicationRecord
  belongs_to :deck
  #belongs_to :user

  validates_presence_of :front, :back  
  validates :front, uniqueness: { scope: :deck_id, case_sensitve: false  }  
  
end

