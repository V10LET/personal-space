class Planet < ApplicationRecord
  has_many :likes
  has_many :comments
  has_many :users, through: :likes
end
