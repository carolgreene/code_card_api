class Api::V1::DecksController < ApplicationController

  def index
    decks = Deck.all 
    render json: DeckSerializer.new(decks)
  end

  def show 
    deck = Deck.find(params[:id])
    render json: DeckSerializer.new(deck)
  end

  def create 
    deck = Deck.new(deck_params)

    if deck.save 
      render json: DeckSerializer.new(deck)
    else 
      error_resp = {
        error: deck.errors.full_messages.to_sentence
      }
      render json: error_resp, status: :unprocessable_entity
    end
  end

  private 

  def deck_params 
    params.require(:deck).permit(:name, :user_id)
  end

  
end
