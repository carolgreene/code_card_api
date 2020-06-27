class Api::V1::DecksController < ApplicationController

  def index
    decks = Deck.all 
    render json: DecksSerializer.new(decks)
  end
  
end
