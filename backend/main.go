package main

import "net/http" // for building HTTP servers
import "encoding/json" // handles JSON data
import "fmt" // for printing log messages

// struct representing a single to do item
type to_do struct {
	Title string `json:"title"`
	Description string `json:"description"`
}

// variable representing a list of 'to_do' items
var to_do_List = []to_do{}

func main() {
	// Your code here

	// initialize the server
	http.HandleFunc("/", ToDoListHandler)

	// start the server
	fmt.Println("Server is running on port 8080...")
	err := http.ListenAndServe(":8080", nil)

	// check if there was an error starting the server
	if err != nil {
		fmt.Println("Error starting server:", err)
	}

}

func ToDoListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // allows cross-origin requests

	// Your code here
	
	// set the content type of the response to JSON
	w.Header().Set("Content-Type", "application/json") 

	// handle POST request to add a to do to the list
	if r.Method == http.MethodPost {
		
		// create a new to do item to add to the list
		var to_do_add to_do

		// parse the incoming JSON data
		err := json.NewDecoder(r.Body).Decode(&to_do_add)

		// check if there was an error parsing the JSON data or if the title or description is empty
		if err != nil || to_do_add.Title == "" || to_do_add.Description == "" {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		// add the new to do to the list
		to_do_List = append(to_do_List, to_do_add)

		// return the newly added to do
		w.WriteHeader(http.StatusOK)
		// encode the new to do into a JSON and write it to the response
		json.NewEncoder(w).Encode(to_do_add)
		return
	}

	// handle GET request for the to do list
	if r.Method == http.MethodGet {
		// Return the to-do list
		w.WriteHeader(http.StatusOK)
		// encode the list into a JSON and write it to the response
		json.NewEncoder(w).Encode(to_do_List) 
		return
	}

	// if the request method is not POST or GET
	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)

}

// Test the server using curl
// go run main.go
// curl -X GET http://localhost:8080/
// curl -X POST http://localhost:8080/ -H "Content-Type: application/json" -d '{"title": "Go for a jog", "description": "run 4km around the river"}'