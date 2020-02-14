class StateScraper
  attr_reader :state, :url
  BASE_URL = "https://ballotpedia.org"

  def initialize(state)
    @state = state
    @url = "#{BASE_URL}/#{state.name}_2020_ballot_measures".sub(" ", "_")
    @ballot_array = []
  end

  def scrape_for_state
    parse_ballots(request_state_ballots)
    determine_scraper
    create_ballot_hash
  end

   private

  def request_state_ballots
    return open(url)
  end

  def parse_ballots(response_data)
    @doc = Nokogiri::HTML(request_state_ballots)
  end

  def determine_scraper
    single_table = @doc.css('.bptable')[0]
    two_tables = @doc.css('.bptable')[0..1]
    case @state.name
    when "California"
      tables = @doc.css('.bptable')[0..5]
      scrape_for_california(tables)
    when "Massachusetts"
      scrape_for_massachusetts(single_table)
    when "Colorado", "Missouri", "Oregon"
      scrape_for_colorado_or_missouri_or_oregon(two_tables)
    when "Arkansas", "Alabama", "Maine", "Michigan", "Montana", "Nebraska", "Nevada", "North Dakota", "Oklahoma", "Utah", "Wyoming"
      scrape_for_states_cluster(two_tables)
    else
      scrape_remaining_states(single_table)
    end
  end

  def scrape_for_states_cluster(two_tables)
    two_tables.collect do |table|
      rows = table.css('tr')[1..-1]
        rows.each do |row|
          name = row.css('td')[1].text.strip
          subject = row.css('td')[2].text.strip
          description = row.css('td')[3].text.strip
          @ballot_array << [name, subject, description]
        end
    end
  end

  def scrape_for_colorado_or_missouri_or_oregon(two_tables)
    two_tables.collect do |table|
      rows = table.css('tr')[1..-1]
      rows.each do |row|
        if table.css('tr')[0].css('th')[1].text.strip == 'Title'
          name = row.css('td')[1].text.strip
          subject = row.css('td')[2].text.strip
          description = row.css('td')[3].text.strip
          @ballot_array << [name, subject, description]
        else
          name = row.css('td')[2].text.strip
          subject = row.css('td')[3].text.strip
          description = row.css('td')[4].text.strip
          @ballot_array << [name, subject, description]
        end
      end
    end
  end

  def scrape_for_massachusetts(single_table)
    rows = single_table.css('tr')[1..-1]
    rows.collect do |row|
      name = row.css('td')[2].text.gsub('"','')
      subject = row.css('td')[3].text.strip
      description = row.css('td')[4].text.strip
      @ballot_array << [name, subject, description]
    end
  end

  def scrape_for_california(tables)
    tables.collect do |table|
      if table.css('tr')[0].css('th')[0].text.strip != 'Ballot Measure:'
        rows = table.css('tr')[1..-1]
        rows.each do |row|
          if table.css('tr')[0].css('th')[1].text.strip == 'Title'
            name = row.css('td')[1].text.strip
            subject = row.css('td')[2].text.strip
            description = row.css('td')[3].text.strip
            @ballot_array << [name, subject, description]
          else
            name = row.css('td')[1].text.strip
            subject = "unspecified"
            description = row.css('td')[2].text.strip
            @ballot_array << [name, subject, description]
          end
        end
      end
    end
  end

  def scrape_remaining_states(single_table)
    rows = single_table.css('tr')[1..-1]
    rows.collect do |row|
      name = row.css('td')[1].text.strip
      subject = row.css('td')[2].text.strip
      description =row.css('td')[3].text.strip
      @ballot_array << [name, subject, description]
    end
  end

  def create_ballot_hash
    ballots = []
    @ballot_array.each do |ballot|
      name = ballot[0]
      subject = ballot[1]
      description = ballot[2]
      ballot_info = {
        state: @state,
        name: name,
        subject: subject,
        description: description
      }

      ballots << ballot_info
    end
    ballots
  end
end
