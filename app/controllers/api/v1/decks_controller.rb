class Api::V1::DecksController < ApplicationController

  def index
    decks = Deck.all 
    render json: DeckSerializer.new(decks)
  end
  
end
