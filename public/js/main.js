const deleteBtn = document.querySelectorAll('.fa-trash') //creating a constant variable and assigning it to a selection to all elements with the class 'fa-trash'
const item = document.querySelectorAll('.item span') //creating a constant variable and assigning it to all span tags within a parent with the class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed') //creating a constant variable and assiging it to all span tags with the 'completed' class, that are within a parent with the class of 'item'

Array.from(deleteBtn).forEach((element)=>{ //creating an array from our selection and starting a loop
    element.addEventListener('click', deleteItem) //adding an event listener on the current item, and on a 'click' calls a function called deleteItem
}) //close our loop

Array.from(item).forEach((element)=>{ //creating an array from our selection and starting a loop
    element.addEventListener('click', markComplete) //adding an event listener on the current item, and on a 'click' calls a function called markComplete
}) //close our loop

Array.from(itemCompleted).forEach((element)=>{ //creating an array from our selection and starting a loop
    element.addEventListener('click', markUnComplete) //adding an event listener on the current item, and on a 'click' calls a function called markUnComplete
}) //close our loop

async function deleteItem(){ //declare an asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText //looks inside the list item and grabs only the inner text within the list span
    try{ //starting a try block to do something
        const response = await fetch('deleteItem', { //creates a response variable that waits on a fetch to retrieve data from the result of deleteItem route
            method: 'delete', //sets the CRUD method for the route
            headers: {'Content-Type': 'application/json'}, //specifiying the type of content expected, which is JSON
            body: JSON.stringify({ //declare the message content being passed, and stringiy that content
              'itemFromJS': itemText //setting the content of the body to the inner text of the list item and naming it 'itemFromJS'
            }) //closing the body
          }) // closing the object
        const data = await response.json() //waiting on JSON from the response to be converted
        console.log(data) //log the data to the console
        location.reload() //reloads the page to update what is displayed

    }catch(err){ //if an error occurs pass the error into the catch block
        console.log(err) //log the error 
    } //close the catch block
} //ends the function

async function markComplete(){ //declare an asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText //looks inside of the list item and grabs only the inner text within the list span
    try{ //starting a try block to do something
        const response = await fetch('markComplete', { //creates a response variable that waits on a fetch to get data from the result of the markComplete route
            method: 'put', //setting the CRUD method to "upsdate" for the route
            headers: {'Content-Type': 'application/json'}, //specifying the type of content expected which is JSON
            body: JSON.stringify({ //declare the message content being passed, and stringify that content
                'itemFromJS': itemText //setting the content of the body to the inner text of the list item and naming it 'itemFromJS'
            }) //closing the body
          }) //closing the object
        const data = await response.json() //waiting on JSON from the response to be converted
        console.log(data) //log the data to the console
        location.reload() //reloads the page to update what is displayed

    }catch(err){ //if an error occurs pass the error into the catch block
        console.log(err) //log the error to the console
    } //close the catch block
} //ends the function

async function markUnComplete(){ //declare an asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText //looks inside of the list item and grabs only the inner text within the list span
    try{ //starting a try block to do something
        const response = await fetch('markUnComplete', {  //creates a response variable that waits on a fetch to get data from the result of the markUnComplete route
            method: 'put', //setting the CRUD method to "upsdate" for the route
            headers: {'Content-Type': 'application/json'}, //specifying the type of content expected which is JSON
            body: JSON.stringify({ //declare the message content being passed, and stringify that content
                'itemFromJS': itemText //setting the content of the body to the inner text of the list item and naming it 'itemFromJS'
            }) //closing the body
          }) //closing the object
        const data = await response.json() //waiting on JSON from the response to be converted
        console.log(data) 
        location.reload() //reloads the page to update what is displayed

    }catch(err){ //if an error occurs pass the error into the catch block
        console.log(err) //log the error to the console
    } //close the catch block
} //ends the function