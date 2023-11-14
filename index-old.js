// index.js
// where your node app starts

// init project
let express = require("express");
let app = express();

const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});


// api/:date endpoint
app.get("/api/:date", function (req, res) {
    console.log(req.params.date.toString());
    const datedata = new Date(isNaN(req.params.date) ? req.params.date : req.params.date * 1);
    if (datedata.getTime()) {
        console.log(datedata);
        const timeString = `${daysArr[datedata.getDay()]}, ${datedata.getDate() > 9 ? datedata.getDate() : `0${datedata.getDate()}`} ${monthArr[datedata.getMonth()]} ${datedata.getFullYear()} ${datedata.getHours() > 9 ? datedata.getHours() : `0${datedata.getHours()}`}:${datedata.getMinutes() > 9 ? datedata.getMinutes() : `0${datedata.getMinutes()}`}:${datedata.getSeconds() > 9 ? datedata.getSeconds() : `0${datedata.getSeconds()}`} GMT`;
        res.json({ "unix": datedata.getTime(), "utc": timeString });
    } else {
        res.json({ error: "Invalid Date" });
    }

});

// api endpoint
app.get("/api", function (req, res) {
    const datedata = new Date();
    const timeString = `${daysArr[datedata.getDay()]}, ${datedata.getDate() > 9 ? datedata.getDate() : `0${datedata.getDate()}`} ${monthArr[datedata.getMonth()]} ${datedata.getFullYear()} ${datedata.getHours() > 9 ? datedata.getHours() : `0${datedata.getHours()}`}:${datedata.getMinutes() > 9 ? datedata.getMinutes() : `0${datedata.getMinutes()}`}:${datedata.getSeconds() > 9 ? datedata.getSeconds() : `0${datedata.getSeconds()}`} GMT`;
    console.log(datedata);
    res.json({ "unix": datedata.getTime(), "utc": timeString });

});

// listen for requests
let listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});