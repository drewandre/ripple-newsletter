require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/flash'

# require 'rest-client'
require 'rspotify'
require 'rspotify/oauth'
require 'omniauth'
require 'omniauth-oauth2'
require 'omniauth-spotify'
require 'httparty'
require 'json'

enable :sessions
set :bind, '0.0.0.0' # bind to all interfaces

configure :development do
  require 'pry'
end

configure do
  # RSpotify.authenticate(ENV['SPOTIFY_ID'], ENV['SPOTIFY_SECRET'])
  # use OmniAuth::Builder do
  # provider :spotify, ENV['SPOTIFY_ID'], ENV['SPOTIFY_SECRET'], scope: 'user-read-private user-library-read user-read-birthdate user-read-email user-top-read user-read-recently-played'
  # end

  set :views, 'app/views'
end

Dir[File.join(File.dirname(__FILE__), 'app', '**', '*.rb')].each do |file|
  require file
  also_reload file
end

get '/' do
  erb :index
end

get '/contact' do
  erb :contact
end

# get '/spotify' do
  # before do
  #   content_type 'application/json'
  # end
# end
get '/spotify/artists/:artist_name' do
  # artists = RSpotify::Artist.search(params['artist_name'], limit: 4)
  return {}
  # return artists.to_json
end

post '/contact' do
  @from_email = params[:from_email]
  @location = params[:location]
  @comments = params[:comments]
  @name = params[:name]
  flash[:success] = "Thanks for the email #{@name.split.first}! Give me 48 hours and I'll get back to you."
  redirect '/contact'
end

get '/*' do
  erb :index
end
