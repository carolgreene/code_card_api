class Deck < ApplicationRecord
  validates_presence_of :name  
  validates :name, uniqueness: { case_sensitive: false }
  

  has_many :cards
  belongs_to :user
end
