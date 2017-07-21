var express = require("express"),
path = require("path"),
bodyParser = require("body-parser"),
session = require('express-session'),
app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/dist')));
app.use(session({ secret: "secret_string" }));

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js')(app);

app.all("*", (req, res, next) => {
		res.sendfile(path.resolve("./public/dist/index.html"))
	})

app.listen(8000, () => {
	console.log("listening on port 8000");
});