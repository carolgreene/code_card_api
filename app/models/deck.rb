class Deck < ApplicationRecord
  has_many :cards, dependent: :destroy
  belongs_to :user

  validates_presence_of :name  
  validates :name, uniqueness: { scope: :user_id, case_sensitve: false  }
  
end
