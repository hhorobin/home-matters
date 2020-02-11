require 'nokogiri'
require 'open-uri'
require 'pry'
require 'titleize'

class Scraper
  attr_reader :state, :url
  # create base URL as CONSTANT

  def initialize(state)
    @state = state.titleize
    @url = "https://ballotpedia.org/#{state}_2020_ballot_measures".sub(" ", "_")
    @doc = nil
  end

  def make_request
    return open(url)
  end

  def parse(response_data)
    @doc = Nokogiri::HTML(make_request)
  end

  def scrape_tables
    @ballot_array = []
    single_table = @doc.css('.bptable')[0]
    two_tables = @doc.css('.bptable')[0..1]

    if colorado_or_missouri_or_oregon
      scrape_for_colorado_or_missouri_or_oregon

    if @state == 'Colorado' || @state == 'Missouri' || @state == 'Oregon'
      two_tables.collect do |table|
        rows = table.css('tr')[1..-1]
        rows.each do |row|
          if table.css('tr')[0].css('th')[1].text.strip == 'Title'
            @name = row.css('td')[1].text.strip
            @subject = row.css('td')[2].text.strip
            @description = row.css('td')[3].text.strip
            @ballot_array << [@name, @subject, @description]
          else
            @name = row.css('td')[2].text.strip
            @subject = row.css('td')[3].text.strip
            @description = row.css('td')[4].text.strip
            @ballot_array << [@name, @subject, @description]
          end
        end
      end
    elsif @state == 'California'
      # scrape_for_california


      tables = @doc.css('.bptable')[0..5]
      tables.collect do |table|
        if table.css('tr')[0].css('th')[0].text.strip != 'Ballot Measure:'
          rows = table.css('tr')[1..-1]
          rows.each do |row|
            if table.css('tr')[0].css('th')[1].text.strip == 'Title'
              @name = row.css('td')[1].text.strip
              @subject = row.css('td')[2].text.strip
              @description = row.css('td')[3].text.strip
              @ballot_array << [@name, @subject, @description]
            else
              @name = row.css('td')[1].text.strip
              @subject = "unspecified"
              @description = row.css('td')[2].text.strip
              @ballot_array << [@name, @subject, @description]
            end
          end
        end
      end
    elsif @state == 'Arkansas' || @state == 'Alabama' || @state == 'Maine' || @state == 'Michigan' || @state == 'Montana' || @state == 'Nebraska' || @state == 'Nevada' || @state == 'North Dakota' || @state == 'Oklahoma' || @state == 'Utah' || @state == 'Wyoming'
      two_tables.collect do |table|
        rows = table.css('tr')[1..-1]
          rows.each do |row|
            @name = row.css('td')[1].text.strip
            @subject = row.css('td')[2].text.strip
            @description = row.css('td')[3].text.strip
            @ballot_array << [@name, @subject, @description]
          end
      end
    elsif @state == 'Massachusetts'
      rows = single_table.css('tr')[1..-1]
      rows.collect do |row|
        @name = row.css('td')[2].text.gsub('"','')
        #HELP
        @subject = row.css('td')[3].text.strip
        @description = row.css('td')[4].text.strip
        @ballot_array << [@name, @subject, @description]
      end
    else
      rows = single_table.css('tr')[1..-1]
      rows.collect do |row|
        @name = row.css('td')[1].text.strip
        @subject = row.css('td')[2].text.strip
        @description =row.css('td')[3].text.strip
        @ballot_array << [@name, @subject, @description]
      end
    end
  end

  def create_ballot_hash
    ballots = []

    @ballot_array.each do |ballot|
      name = ballot[0]
      subject = ballot[1]
      description = ballot[2]
      ballot_info = {
        state: @state, #should this be here?
        name: name,
        subject: subject,
        description: description
      }

      ballots << ballot_info
    end
    puts ballots
  end
end

# scraper = Scraper.new('Alabama')
# scraper.parse
# scraper.scrape_tables
# scraper.create_ballot_hash
