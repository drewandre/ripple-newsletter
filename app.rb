require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/flash'

require 'rest-client'
require 'rspotify'
require 'rspotify/oauth'
require 'omniauth'
require 'omniauth-oauth2'
require 'omniauth-spotify'
require 'httparty'
require 'json'

begin
  require './env' if File.exists?('env.rb')
rescue LoadError
  puts "Couldn't find env file"
end

enable :sessions
set :bind, '0.0.0.0' # bind to all interfaces

configure :development do
  require 'pry'
end

configure do
  RSpotify.authenticate("94edf5f4258044c9871a291fa7cafbae", "331e3742f32f44a4b1c3bb65839ad605")
  use OmniAuth::Builder do
    provider :spotify, '94edf5f4258044c9871a291fa7cafbae', '331e3742f32f44a4b1c3bb65839ad605', scope: 'user-read-private user-library-read user-read-birthdate user-read-email user-top-read user-read-recently-played'
  end
  RSpotify.raw_response = true
  # set :views, 'app/views'
  # binding.pry
  set :public_folder  , File.expand_path('../public', __FILE__)
  set :views          , File.expand_path('../app/views', __FILE__)
  set :root           , File.dirname(__FILE__)
  set :show_exceptions, development?
end

# Dir[File.join(File.dirname(__FILE__), 'app', '**', '*.rb')].each do |file|
#   require file
#   also_reload file
# end

get '/' do
  erb :index
end

post '/register' do
  payload = request.body.read;
  begin
    response = RestClient::Request.execute(
      method: :post,
      user: 'anything',
      password: '526e48d4d5e6341fa9e2f6f174149243',
      url: "https://us17.api.mailchimp.com/3.0/lists/a1739a408d/members",
      payload: payload,
      headers: { :accept => :json, content_type: :json }
    )
  rescue RestClient::BadRequest => e
    return JSON.parse(e.response.body)['status']
  end
  return "200"
end

get '/spotify/artists/:artist_name' do
  return RSpotify::Artist.search(params['artist_name'], limit: 4).to_json
end

get '/*' do
  erb :index
end
