# README

[![Codeship Status for hhorobin/home-matters](https://app.codeship.com/projects/a1b51010-2e3f-0138-11ca-56b7d5cdb6a3/status?branch=master)](https://app.codeship.com/projects/384803)

Heroku Link:https://home-matters.herokuapp.com/

## Description
A non-partisan app to help users get informed about and involved in upcoming state initiatives and referendums. To source data, created Nokogiri scraper and used the OpenStates API.

## To Run Locally
- download the repo
- yarn install
- bundle exec bundle install
- bundle exec rake db:create
- bundle exec rake db:migrate
- bundle exec rake db:seed
- yarn start
- rails s
Visit localhost:3000

## Running the tests

- yarn test
- bundle exec rspec


### Technologies Used
- Ruby - 2.6.5
- Rails - 5.2.3
- React - 16.8.0
- PostgreSQL
- Bootstrap
- httparty
- openStates API
- Nokogiri
- Geocoder
- D3.js
- SVG
- Twilio
- FactoryBot
- Devise

## Author
* **Hannah Horobin**

## Acknowledgments
* Thanks to Alexandra Weber for creating the logo
