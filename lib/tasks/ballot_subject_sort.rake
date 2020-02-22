require 'json'

desc "sorts ballots by subject and generates JSON file that is written to react folder"
task :sort_ballots_by_subject => :environment do
    queries = ["education", "taxes", "environment", "energy", "marijuana", "campaign finance", "immigration", "healthcare", "minimum wage", "government", "agriculture", "regulation", "elections", "LGBT", "parks", "animals", "direct democracy", "redistricting", "term limits", "transportation", "firearms", "judiciary", "constitution", "law enforcement", "housing", "eminent domain", "unions", "lobbying", "trials", "suffrage"]

    subject_hashes = []

    queries.each do |query|
      count = Ballot.where("LOWER(subject) ILIKE ?", "%#{query}%").count
      subject = { name: query, count: count }
      subject_hashes << subject
      file = File.new("all_subjects.json", "w")
      file.puts JSON.pretty_generate(subject_hashes)
    end
end
