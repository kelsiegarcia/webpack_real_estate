class Api::ListingsController < ApplicationController
  def index
    render json: Listing.all
  end

  def create
    listing = Listing.new(listing_params)
    if listing.save
      render json: listing
    else
      render json: { errors: item.errors, status: :unproccesible_entity }
    end
  end

  def update
    listing = Listing.find(params[:id])
    listing.update(complete !item.complete)
    render json: item
  end

  def destroy
    Listing.find(params[:id]).destory
    render json: { message: 'Item deleted' }
  end

  private

  def listing_params
    params.require(:listings).permit(:name, :bed, :bath, :city )
  end
end
