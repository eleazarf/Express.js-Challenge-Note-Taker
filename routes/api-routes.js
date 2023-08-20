// Import the 'fs' module for working with files.
const fs = require("fs");

// Read and parse the content of the 'db.json' file using 'fs.readFileSync'.
// Store the parsed data in the 'data' variable.
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// Export a function that sets up API routes for the Express app.
module.exports = function(app) {

    // Define a GET route for "/api/notes".
    app.get("/api/notes", function(req, res) {
        // Respond with JSON data stored in the 'data' object or variable.
        res.json(data);
    });

    // Define a GET route for "/api/notes/:id".
    app.get("/api/notes/:id", function(req, res) {
        // Respond with JSON data at the specified index based on the ':id' parameter.
        res.json(data[Number(req.params.id)]);
    });

    // Define a route handler for the HTTP POST request on the "/api/notes" URL.
    app.post("/api/notes", function(req, res) {

        // Extract the new note from the request body.
        let newNote = req.body;

        // Generate a unique ID for the new note using the length of existing data.
        let uniqueId = (data.length).toString();

        // Attach the generated unique ID to the new note.
        newNote.id = uniqueId;

        // Push the new note to the 'data' array.
        data.push(newNote);

        // Write the updated 'data' array to the 'db.json' file.
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);
        });

        // Respond with the updated 'data' array in JSON format.
        res.json(data);
        }); 

        // Define a route handler for the HTTP DELETE request on the "/api/notes/:id" URL.
    app.delete("/api/notes/:id", function(req, res) {

        // Extract the note ID from the URL parameter.
        let noteId = req.params.id;

        // Initialize a new ID counter for re-indexing notes.
        let newId = 0;

        // Log the deletion action.
        console.log(`Deleting note with id ${noteId}`);

        // Filter out the note with the specified ID from the 'data' array.
        data = data.filter(currentNote => {
            return currentNote.id != noteId;
        });

        // Re-index the remaining notes with new IDs.
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }

        // Write the updated 'data' array to the 'db.json' file.
        fs.writeFileSync("./db/db.json", JSON.stringify(data));

        // Respond with the updated 'data' array in JSON format.
        res.json(data);
    });
}