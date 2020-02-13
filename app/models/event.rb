class Event < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :date, presence: true
  validates :time, presence: true

  belongs_to :ballot
  belongs_to :creator, class_name: "User"

  has_many :responses
  has_many :users, through: :responses
end
