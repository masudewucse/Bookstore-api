# Bookstore API
NodeJS, MongoDB, Amazon AWS (EC2)
### Made using: 
- **NodeJS, MongoDB, AWS (Amazon EC2)**

### Setup
- Create an account in Amazon AWS.  
- Configure your EC2 service & create an Instance for your environment: 
- Install nodeJS
- Install mongodb in your ec2 maschine by taking help from: --`https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/`. 
- Type: `sudo service mongod start`. 
- Type: `mongo`. 
- Collection name `use YOUR_COLLECTION_NAME`. 
- Create use and pass:  `db.createUser({user:"YOUR_COLLECTION_USER_NAME",pwd:"YOUR_COLLECTION_PASSWORD",roles:["dbOwner"]})`. 
- Download all files and Configure the database, modify the `.env` file `DATABASE_URI_dev: mongodb://YOUR_COLLECTION_USER_NAME:YOUR_COLLECTION_PASSWORD@localhost:27017/YOUR_COLLECTION_NAME?retryWrites=true&w=majority`. 
- Project root folder, Run the `packages.json` file using `npm install` to install all necessary packages.  
- Finally run `nodemon app.js`. 


### Features
#### 1. Super Admin:
Only Administrator can `DELETE` and `PUT` (edit)  Users, Genere & Books. 
Administrator creation:
- Go to step 2 and create the user. 
- manually set the property `isAdmin: true` for Administrator user. 
- get the token by   
POST `/auth` and provide Administrator user and password. 
```json
{
    "email": "admin@gmail.com",
    "password": "12345678"
}
```
- Your will receive the `JWT` token. Use this token as the value of header `x-auth-token`. 
- Done, your are Administrator. 

#### 2. USER: create, edit & delete. 
Only admin can delete and edit an user. 
- Create user by `POST` request: `/user`. 
```json
{
    "name":"Nehan Rana",
    "email": "emailaddress@gmail.com",
    "password":"jE5$iu9%4"
}
```
- Edit user by `PUT` request: `/user/object_ID`
```json
{
    "name":"Masud Rana",
    "email": "myemail@gmail.com",
    "password":"9879asd879sd87"
}
```
- Delete User by `DELETE` request: `/user/object_ID`. 

#### 3. Genres: create, view, edit & delete
Only admin can delete and edit Genre. 
- **Create** Genre by `POST` request: `/genre`. 
```json
{
    "name":"Storry telling"
}
```
- **Edit** Genre by `PUT` request: `/genre/object_ID`
```json
{
    "name" : "Story Telling"
}
```
- **View** single or all Genre by `GET` request `/genre/Object_Id` or `/genre/` for all. 
- **Delete** Genre by `DELETE` request: `/genre/object_ID`. 

#### 4. Book: create, view, edit & delete. 
Only admin can delete and edit Genre. 
- **Create** Book by `POST` request: `/book`. 
```json
{
    "name": "Al Quran",
    "autor": "Allah",
    "genre": "Genre_object_ID",
    "price": 300,
    "inStock": 50
}
```
- **Edit** Genre by `PUT` request: `/book/object_ID`. 
```json
    {
    "name": "Al Quran english",
    "autor": "Allah",
    "genre": "5f9d8a3cf2ee3c60df672ec8",
    "price":350,
    "inStock":100
}
```
- View single or all Books by `GET` request `/book/Object_Id` or `/book/` for all
- Delete Book by `DELETE` request: `/book/object_ID`. 
