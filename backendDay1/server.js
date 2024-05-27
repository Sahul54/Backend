const express = require('express');
const app = express();

// Correct the way body-parser is imported and used
const bodyParser = require('body-parser');

// specifically parse JSON data & it to the request .body object
app.use(bodyParser.json());

// app Listen
app.listen(3000, () => {
    console.log("Server is started at port 3000.");
})

// Route
app.get('/', (request, response) => {
    response.send("hello jee... kaise ho aap log....")
})

// Route
app.post('/about', (request, response) => { // Fixed typo "resopnse" to "response"
    const { name, brand } = request.body;
    console.log(name);
    console.log(brand);
    response.send("Car bahut aachi hai");
})

// mongoDB connected

const mongoose = require('mongoose'); // Fixed typo "mongioose" to "mongoose"

mongoose.connect('mongodb://localhost:27017/myDatabase')
.then(() => {
    console.log("Connection Successful!");
})
.catch(() => {
    console.log("Connection failed!");
})
