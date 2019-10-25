class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    last_message_id = params[:last_message_id].to_i
    @messages = @group.messages.includes(:user).where("id > #{last_message_id}").where.not(id: current_user.id)
    respond_to do |format|
      format.json    
      format.html
    end
  end
end