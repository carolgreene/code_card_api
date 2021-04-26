class Api::V1::CardsController < ApplicationController
  skip_before_action :authorized, only: [:index]  #will need to remove this once I fix it
  before_action :set_card, only: [:show, :update, :destroy]

  def index 
    cards = Card.all 
    render json: CardSerializer.new(cards)
  end  

  def show 
    card = Card.find(params[:id])
    render json: CardSerializer.new(card)
  end
  
  def create       
    card = Card.new(card_params)
    
    if card.save 
      render json: CardSerializer.new(card)
    else 
      error_resp = {
        error: card.errors.full_messages.to_sentence    
      }
      render json: error_resp, status: :unprocessable_entity
    end
  end

  def update 
    card = Card.find(params[:id])
    if card.update(card_params) 
      render json: CardSerializer.new(card)
    else
      error_resp = {
        error: card.errors.full_messages.to_sentence
      }
      render json: error_resp, status: :unprocessable_entity
    end 
  end

  def destroy    
    card = Card.find(params[:id])
    deckId = card.deck_id
    cards = Card.all    
    card.destroy
    cardsLeft = cards.select {|card| card.deck_id == deckId}
    #byebug
    render json: CardSerializer.new(cardsLeft) 
  end


    private 

    def set_card 
      card = Card.find(params[:id])
    end

    def card_params 
      params.require(:card).permit(:front, :back, :deck_id)
    end

end
