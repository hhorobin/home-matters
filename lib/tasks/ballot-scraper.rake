namespace :ballot do
  desc "scrapes ballotpedia"
  task :scrape => :environment do
    country_scraper = CountryScraper.scrape_for_states
    binding.pry
  end
end
