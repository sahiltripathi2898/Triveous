Welcome to Bookmark application , you can test the API using postman or add /api/ at the end of the url to get all bookmark.<br/>

Back-end is made using Nodejs and Express<br/>
DataBase used is MongoDB

npm i --- to install all packages<br/>
npm run server ---- to run the server using nodemon<br/>
App-> Models has the BookMarks Schema<br/>
App-> Routes has the routes<br/>
config -> It has the config (Kindly add your MongoDB key here)<br/>

(1) Get all the bookmarks<br/>
GET request<br/>
localhost:2000/api/<br/>

(2) Add a bookmark<br/>
POST<br/>
localhost:2000/api/<br/>
Example - To be send as the body<br/>
{<br/>
"Title":"Trump’s Claim of Total Authority",<br/>
"Link":"www.google.com",<br/>
"Publisher":"Sahil",<br/>
"Tags":{<br/>
"Title":"Politics"<br/>
}<br/>
}<br/>
id is generated using UUID,<br/>
Created and Updated date are also added by the server.<br/>

(3) Get a bookmark by its id<br/>
GET<br/>
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e<br/><br/>

(4) Find and Update a bookmark<br/>
PUT<br/>
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e<br/>
Example - To be send as the body<br/>
{<br/>
"Title":"Trump’s Claim of Total Authority",<br/>
"Link":"www.google.com",<br/>
"Publisher":"Sahil Tripathi",<br/>
"Tags":{<br/>
"Title":"Politics"<br/>
}<br/>
}<br/>

(5) Delete a bookmark by its id<br/><br/>
DELETE<br/>
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e<br/>

(6) Get the tags of a bookmark by its Id<br/>
GET<br/>
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e/get-tag<br/>

(7) Add a tag in a bookmark with it's id<br/>
PUT<br/>
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e/add-tag<br/>
Example- To be send as the body<br/><br/>
{<br/>
"Title":"USA"<br/>
}<br/>
This also updates the time UpdatedTime of that bookmark<br/>

(8) Get all the tag and output it<br/>
GET<br/>
localhost:2000/api/each/tags<br/>

(9) Delete a tag in a bookmark with it's id<br/>
DELETE<br/>
localhost:2000/api/35be8870-eab9-11ea-8607-2d5b427dde5e/USA<br/>
