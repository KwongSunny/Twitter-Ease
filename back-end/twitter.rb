# connect to Twitter API
require "Twitter"
client = Twitter::REST::Client.new do |config|
    config.consumer_key = "5sOOFfHHPYjiPQyeBcTrPeZhl"
    config.consumer_secret = "nf8d6tIDEPwiQI8iBfMA0272KrK4LeEKrHMNagMuMQOjrg9LRE"
    config.access_token = "998982729021603840-hn5G0obTyAwtdl2zUXVn2TvtFPFeTnQ"
    config.access_token_secret = "GU0HuihhLHSRtqoKYtOTjE5kUKJdYGSsd73jeOjqy3K5a"
end
client.update('Hello World!')
