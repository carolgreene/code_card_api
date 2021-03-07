class User < ApplicationRecord
  validates_presence_of :name, :password  
  validates :name, uniqueness: { case_sensitive: false }
  
  has_secure_password
  has_many :decks 
  #has_many :cards, through: :decks
end
