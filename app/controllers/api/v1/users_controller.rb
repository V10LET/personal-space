class Api::V1::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    end
  end

  def update
    @user = User.find(params[:id]).update(user_params)
    render json: @user
  end

  def destroy
    User.find(params[:id]).destroy
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :bio, :image_url, :password, :password_confirmation)
  end
end
