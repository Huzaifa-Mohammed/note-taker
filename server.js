const express = require('express');
const app = express();
const path = require("path")
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/Develop/public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/Develop/public/index.html")
})
app.get("/notes", (req, res) => {

    res.sendFile(__dirname + "/Develop/public/notes.html")
})





app.get("/api/notes", (req, res) => {
    res.sendFile(__dirname + "/Develop/db/db.json")
})
app.post("/api/notes", function(req, res) {
    fs.readFile("/Develop/db/db.json", (err, data) => {
        if (err) throw err;

        let input = JSON.parse(data);

        let newInput = req.body;
        let uID = (input.length).toString();
        newInput.id = uId;

        input.push(newInput);

        fs.writeFile("/Develop/db/db.json", JSON.stringify(input), (err, data) => {
            if (err) throw err;
            console.log("New note added ");
        });

        res.json(input);
    });
});





app.listen(PORT, () => {
    console.log(`APP is on port! ` + PORT);
});