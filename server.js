var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;
var tableCount = 0;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var table = [
  {
    name: "obiwankenobi",
    phoneNumber: "555-5555",
    email: "JediMaster2@gmail.com",
    uniqueid: "Obi-wan's Table",
  }
];

var waitTableList = [
    {
    name: "yoda",
    phoneNumber: "555-5555",
    email: "JediMaster@gmail.com",
    uniqueid: "Green Ears",
    }
]

//Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/view.html", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve.html", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables.html", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

//Get
app.get("/api/tables", function(req, res) {
  return res.json(table);
});

app.get("/api/waitTables", function(req, res) {
  return res.json(waitTableList);
});

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newTable = req.body;
  tableCount++;

 // replace(/\s+/g, "") -> "Chris Tabones" --> ChrisTabones
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

 console.log(newTable);

 if(tableCount < 6) {
      table.push(newTable);
       res.json(newTable);
  } else {
      waitTableList.push(newTable)
        res.json(newTable);
  }


});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});