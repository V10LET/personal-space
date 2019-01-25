class Api::V1::CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render json: @comments
  end

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def update
    @comment = Comment.find(params[:id]).update(comment_params)
    render json: @comment
  end

  def destroy
    Comment.find(params[:id]).destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :planet_id)
  end
end
