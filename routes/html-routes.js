// Import the 'path' module for working with file paths.

const path = require("path");

// Export a function that sets up HTML routes for the Express app.
module.exports = function(app) {
    
    // Define a route handler for the root URL ("/").
    app.get("/", function(req, res) {
        // Send the 'index.html' file located in the 'public/' directory.
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
    // Define a route handler for the "/notes" URL.
    app.get("/notes", function(req, res) {
        // Send the 'notes.html' file located in the 'public/' directory.
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

}