FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(min_length)
    name {Faker::Name.last_name}
    email {Faker::Internet.free_email}
    password {password}
    pasword_confirmation {password}
  end
end