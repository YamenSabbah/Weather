// Setup empty JS object to act as endpoint for all routes
projectData = {};

const cors = require("cors");
const bodyParser = require("body-parser");

// Require Express to run server and routes
const express = require("express");
const app = express();

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/all", (req, res) => {
    res.send(projectData);
});

app.post("/add", (req, res) => {
    projectData = {
        temperature: req.body.temp,
        date: req.body.date,
        content: req.body.content,
    };
    res.send({ message: "Data received", projectData }); // Send a response back
});
// Setup Server
const port = 3030;
app.listen(port, () => {
    console.log(`he server is running now in http://localhost:${port}`);
});
