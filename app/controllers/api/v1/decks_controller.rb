class Api::V1::DecksController < ApplicationController
  skip_before_action :authorized, only: [:index]  #will need to remove this once I fix it
  before_action :set_deck, only: [:show, :update, :destroy]

  def index
    decks = Deck.all 
    #render json: DeckSerializer.new(decks)
    render json: decks.to_json(:include => {
      :cards => {:except => [:created_at, :updated_at]}
    }, :except => [:created_at, :updated_at])
  end

  def show 
    deck = Deck.find(params[:id])
    render json: deck.to_json(:include => {
      :cards => {:except => [:created_at, :updated_at]}
    }, :except => [:created_at, :updated_at])    
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

  def update
    deck = Deck.find(params[:id])
    if deck.update(deck_params)
      render json: deck.to_json(:include => {
      :cards => {:except => [:created_at, :updated_at]}
    }, :except => [:created_at, :updated_at])        
    else
      error_resp = {
        error: deck.errors.full_messages.to_sentence
      }
      render json: error_resp, status: :unprocessable_entity
    end
  end

  def destroy
    deck = Deck.find(params[:id])
    decks = Deck.all
    deck.destroy
    #render json: DeckSerializer.new(decks)
    render json: decks.to_json(:include => {
      :cards => {:except => [:created_at, :updated_at]}
    }, :except => [:created_at, :updated_at])
  end



  private 

  def set_deck 
    deck = Deck.find(params[:id])
  end

  def deck_params 
    params.require(:deck).permit(:name, :user_id)
  end

  
end
