@app
architect-test

@aws
region ap-northeast-1
runtime typescript

@static
spa true

@http
# * any api test
/api/*
  method any
  src /src/api
# post /api/create-payment-intent
# any /api/graphql
# # * user
# post /api/users
# get /api/users
# # * notes
# post /api/notes
# get /api/notes

@plugins
architect/plugin-typescript

# @tables
# user
#   id *String
#   email String
#   password String
# note
#   id *String
#   userId String
#   title String
#   body String

# @tables-indexes
# note
#   userId *String
#   name userIdIndex