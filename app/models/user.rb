class User < ApplicationRecord
  validates_presence_of :name, :password  
  validates :name, uniqueness: true  
  
  has_secure_password
  has_many :decks
end
