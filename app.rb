require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/flash'
require 'sass/plugin/rack'
require 'httparty'
require 'json'

enable :sessions

set :bind, '0.0.0.0' # bind to all interfaces

configure :development do
  require 'pry'
end

configure do
  Sass::Plugin.options[:style] = :compressed
  use Sass::Plugin::Rack
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
