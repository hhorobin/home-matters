ballots = CountryScraper.scrape_for_states
Ballot.create_from_collection(ballots)
