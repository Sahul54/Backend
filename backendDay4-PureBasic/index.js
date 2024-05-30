const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) =>{
    // console.log("App start");
    res.send(`<h1> Hello jii</h1>`)
});

app.post("/home", (req, res) => {
     res.send("Recived Post");
});

app.delete("/delete", (req, res) => {
    res.send("Delete msg")
});

app.listen(port, ()=>{
    console.log("App Start");
})