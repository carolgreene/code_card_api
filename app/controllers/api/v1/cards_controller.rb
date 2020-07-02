class Api::V1::CardsController < ApplicationController

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

    private 

    def card_params 
      params.require(:card).permit(:front, :back, deck_id)
    end


end
