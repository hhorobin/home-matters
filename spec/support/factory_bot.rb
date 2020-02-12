require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:first_name) {|n| "Stella#{n}" }
    sequence(:last_name) {|n| "Smith#{n}" }
    sequence(:city) {|n| "Boston#{n}" }
    sequence(:state) {|n| "Massachusetts#{n}" }
    phone { rand(10**9..10**10) }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :admin_user, :parent => :user do
    role { "admin" }
  end
end
