// Import the 'express' module to create a web application using the Express framework.
const express = require("express");

// Import the 'fs' module (File System) for working with files and directories.
const fs = require("fs");

// Create an instance of the Express application using the 'express' module.
var app = express();

// Define the port number that the application will listen on.
// If the PORT environment variable is set, use that value; otherwise, default to port 3300.
var PORT = process.env.PORT || 3300;

// Configure middleware for the Express application.
// Parse incoming request bodies with url-encoded and JSON data, making it accessible through 'req.body'.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files located in the "/public/assets" directory under the specified URL path.
app.use("/public/assets", express.static(__dirname + "/public/assets"));

// Include and use route handlers for HTML and API routes.
// Include and invoke the function exported from './routes/html-routes' with the 'app' parameter.
require("./routes/html-routes")(app);

// Include and invoke the function exported from './routes/api-routes' with the 'app' parameter.
require("./routes/api-routes")(app);

// Start the Express application server to listen for incoming requests on the specified port.
app.listen(PORT, function() {
    // Display a message in the console when the server starts, indicating the port it's listening on.
    console.log("App listening on PORT " + PORT);
});