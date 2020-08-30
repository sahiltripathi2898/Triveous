Welcome to Bookmark application , you can test the API using postman or add /api/ at the end of the url to get all bookmark.

Back-end is made using Nodejs and Express
DataBase used is MongoDB

npm i --- to install all packages
npm run server ---- to run the server using nodemon
App-> Models has the BookMarks Schema
App-> Routes has the routes
config -> It has the config (Kindly add your MongoDB key here)

(1) Get all the bookmarks
GET request
localhost:2000/api/

(2) Add a bookmark
POST
localhost:2000/api/
Example - To be send as the body
{
"Title":"Trump’s Claim of Total Authority",
"Link":"www.google.com",
"Publisher":"Sahil",
"Tags":{
"Title":"Politics"
}
}
id is generated using UUID,
Created and Updated date are also added by the server.

(3) Get a bookmark by its id
GET
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e

(4) Find and Update a bookmark
PUT
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e
Example - To be send as the body
{
"Title":"Trump’s Claim of Total Authority",
"Link":"www.google.com",
"Publisher":"Sahil Tripathi",
"Tags":{
"Title":"Politics"
}
}

(5) Delete a bookmark by its id
DELETE
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e

(6) Get the tags of a bookmark by its Id
GET
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e/get-tag

(7) Add a tag in a bookmark with it's id
PUT
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e/add-tag
Example- To be send as the body
{
"Title":"USA"
}
This also updates the time UpdatedTime of that bookmark

(8) Get all the tag and output it
GET
localhost:2000/api/each/tags

(9) Delete a tag in a bookmark with it's id
DELETE
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e/USA
