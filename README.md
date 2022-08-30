# Pets-APi
Node Js Project to Perform CRUD operations on MongoDB using an Excel sheet Upload too.

# Approach
  * Credted a standard mongodb scema as 
    name: String
    type: String,
    breed: String,
    age: Number
  * Performed Standard MongoDB CRUD Operations
  * Used XLSX and MULTER for handling files in the request and reading 
 
# Folder Structure
  ![image](https://user-images.githubusercontent.com/28898534/187344566-c54717e2-7ea3-4617-bb4f-ea1bf09b7ab5.png)
  * MODELS for holding our schema
  * ROUTES for holding all the api routes controllers
  * UPLOADS for storing uploaded files
  * PetsApiDocumentation.json API Documentation for Clients like Postman and Insomnia
  * records.xlsx dummy excel file showing the sheet format
# Mentionable Libraries Used

  * Multer for file handling from requests
  * Mongoose for connecting to mongodb
  * xlsx for reading file

# API's

## api/pet/:id (GET)
Standard GET api call to read the entry matching the id in the request with the db implemented using findById() 

![image](https://user-images.githubusercontent.com/28898534/187342326-62d312d4-18d0-4743-b68b-6e51af2404f8.png)

## api/pet (GET)
Standard GET api call to read all the records in the db implemented using find() 

![image](https://user-images.githubusercontent.com/28898534/187343747-ab9d3d0d-a051-4946-ad5e-754093e0e1af.png)


## api/pet/:id (DELETE)
Standard Delete api call that deletes the entry with the specified id in the request implemented using remove() 

![image](https://user-images.githubusercontent.com/28898534/187342684-d327e41b-e934-4a44-9b24-32537d68d100.png)

## api/pet/:id (PATCH)
Standard Patch api call that Updates the entry with the specified id with the data in the request body implemented using updateOne() 

![image](https://user-images.githubusercontent.com/28898534/187342882-0050e048-1dec-4672-b889-1accd39d949b.png)

## api/pet (POST)
Send a multpart form with a excel file attached with key records in the desired format to automatically add multiple pets implemnted using xlsx for reading
excel file, multer for handling file in the request body and finaly using insertMany() to bulk create records

![image](https://user-images.githubusercontent.com/28898534/187343363-43e10bb2-e080-49df-a174-db99ccbb56e8.png)

# Setup Instructions
npm install
npm start

# Other information
DB credentials aren't removed from the code yet for testing purpose
