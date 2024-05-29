const express = require("express");
const app = express();

app.listen(3000, () =>{
    console.log("App is started!");
})

app.get("/", (req, res) =>{
   res.send(`<h1>This is Home page</h1>`);
})