class CountryScraper
    STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Florida", "Hawaii", "Idaho", "Illinois", "Iowa", "Kentucky", "Louisiana", "Maine", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "South Dakota", "Utah", "Virginia", "Washington", "Wisconsin", "Wyoming"]

  def self.scrape_for_states
    ballots = []
    STATES.each do |state|
      new_state = State.create(name: state)
      ballots << StateScraper.new(new_state).scrape_for_state
    end
    ballots
  end
end
