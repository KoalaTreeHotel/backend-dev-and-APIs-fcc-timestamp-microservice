// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
// ME START
// app.get() route is a string
app.get("/api/:inputDate", function (req, res) {
    let theDate = new Date(req.params.inputDate);

    // toUTCString() returns "Invalid Date" if the inputDate parameter is invalid as input to Date
    if (theDate.toUTCString() === "Invalid Date") {
        // assume input is a number and convert this number to a date
        theDate = new Date(Number(req.params.inputDate));
        // check the date again for validity (was assumption of number correct?)
        if (theDate.toUTCString() === "Invalid Date") {
            // error respnse asked for by FCC
            res.json({ error: "Invalid Date" });
            // can only return one 'res'ponse from function route
            return;
        }
    }

    // respond with JSON showing the unix time and UTC time
    res.json({
        // getTime() returns the time value in UNIX format ('ms' since midnight, 70-01-01 UTC)
        // key unix, value current time
        unix: theDate.getTime(),
        // toUTCString() returns the time (current time in this case) in UTC format
        // key utc, value current time
        utc: theDate.toUTCString(),
    });
});
// FCC: deal with empty date string in URL by returning unix key with value time and utc key with value time
app.get("/api", function (req, res) {
    // empty Date constructor gives the current time
    let curDate = new Date(); 
    res.json({
        // getTime() returns the time (current time in this case) in UNIX format ('ms' since midnight, 70-01-01 UTC)
        // key unix, value current time
        unix: curDate.getTime(),
        // toUTCString() returns the time (current time in this case) in UTC format
        // key utc, value current time
        utc: curDate.toUTCString(),
    });
});
// ME END

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
