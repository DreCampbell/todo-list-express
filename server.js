const express = require('express') //makes it possible to use express in this file
const app = express() //setting constant and assigning it to  the instance of express
const MongoClient = require('mongodb').MongoClient //makes it possible to use methods associated with MongoClient and talk to our DB
const PORT = 2121 //setting a constant to determine the location where our server will be listening
require('dotenv').config() //allows us to look for variables inside of the .env file


let db, //declaring a variable called db but not assigning a value
    dbConnectionStr = process.env.DB_STRING, //declaring a variable and assigning it our database connection string
    dbName = 'todo' //declaring a variable and assigning it the name of the database we will be using

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //creating a connection to MongoDb and passing in our connection string. Alsom passing in an additional property
    .then(client => { //waiting for the connection to the DB and proceeding if successful, also passing in all the client info
        console.log(`Connected to ${dbName} Database`) //logging a template literal that we are to the console that we are connected to our database
        db = client.db(dbName) //assigning a value to a previously declared db variable that contains a db client factory method
    }) //closing our .then
    
//middleware
app.set('view engine', 'ejs') //setting ejs as the default render
app.use(express.static('public')) //sets the location for static assets
app.use(express.urlencoded({ extended: true })) //tells express to decode and encode URLs where the header matches the content. Supports arrays and objects
app.use(express.json()) //parses JSON content


app.get('/',async (request, response)=>{ //starts a GET method when the root route is passed in, sets up req and res parameters
    const todoItems = await db.collection('todos').find().toArray() //sets a variable and awaits all items from the todos collection
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) //sets a variable and awaits a count of documents where the completed property is false
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) //redering the EJS file and passing through the db items and the count remaining inside of an object
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => { //starts a POST method when the /addTodo route is passed in 
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) //inserts a new item into the todos collection, giving it a completed value of false by default
    .then(result => { //if insert is successful, do something
        console.log('Todo Added') //log "Todo Added" to the console
        response.redirect('/') //redirect from /addTodo back to the root route to refresh the page
    }) //closing the .then
    .catch(error => console.error(error)) //catching errors
}) //ending the POST request

app.put('/markComplete', (request, response) => { //starting a PUT method when the markComplete route is passed in
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in the db for one item matching the name of the item passed in from the main.js file that was clicked
        $set: { 
            completed: true //setting the completed status to true
          }
    },{
        sort: {_id: -1}, //moves item to the bottom of the list
        upsert: false //prevents insertion if the item does not already exist
    })
    .then(result => { //starting a .then if the update was successful
        console.log('Marked Complete') //logging successful completion
        response.json('Marked Complete') //sending a response back to the sender
    }) //closing the .then
    .catch(error => console.error(error)) //catching errors
})

app.put('/markUnComplete', (request, response) => { //starting a PUT method when the markUnComplete route is passed in
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ //look in the db for one item matching the name of the item passed in from the main.js file that was clicked
        $set: { 
            completed: false //setting the completed status to false
          }
    },{
        sort: {_id: -1}, //moves item to the bottom of the list
        upsert: false //prevents insertion if the item does not already exist
    })
    .then(result => { //starting a .then if the update was successful
        console.log('Marked Complete') //logging successful completion
        response.json('Marked Complete') //sending a response back to the sender
    }) //closing the .then
    .catch(error => console.error(error)) //catching errors
})

app.delete('/deleteItem', (request, response) => { //starting a DELETE method when the delete route is passed
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) //look in the db for one item matching the name of the item passed and deleting it
    .then(result => { //starting a .then if the delete was successful
        console.log('Todo Deleted') //logging successful completion
        response.json('Todo Deleted') //sending a response back to the sender
    }) // closing the .then
    .catch(error => console.error(error)) //catching errors

})

app.listen(process.env.PORT || PORT, ()=>{ //setting up which port we will be listening on - either the port from the .env file or the port variable
    console.log(`Server running on port ${PORT}`) //logging the running port
}) //end ths listen method