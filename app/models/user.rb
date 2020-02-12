class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :phone, presence: true

  has_many :events, through: :responses
  has_many :created_events, class_name: "Event", foreign_key: "creator_id"

  has_many :attendees, class_name: "User", foreign_key: "creator_id"
  belongs_to :creator, class_name: "User", optional: true

  def admin?
    role == "admin"
  end
end
