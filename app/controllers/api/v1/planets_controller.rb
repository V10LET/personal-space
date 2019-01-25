class Api::V1::PlanetsController < ApplicationController
  def index
    @planets = Planet.all
    render json: @planets
  end

  def show
    @planet = Planet.find(params[:id])
    render json: @planet
  end

  def create
    puts params
    @planet = Planet.new(planet_params)
    if @planet.save
      render json: @planet
    end
  end

  def update
    @planet = Planet.find(params[:id]).update(planet_params)
    render json: @planet
  end

  def destroy
    Planet.find(params[:id]).destroy
  end

  private

  def planet_params
    params.require(:planet).permit(:name, :image_url, :notes)
  end
end
