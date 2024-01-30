var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = require("./app/models/");

db.sequelize.sync()
    .then(() => {
        console.log("synced db.");
    })
    .catch(err => {
        console.log("Failed to sync db: " + err.message);
    })

app.get("/", (req, res) => {
    res.json({ message: "Welcome to survey application."});
})

require("./app/routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
