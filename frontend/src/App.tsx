import React, { useEffect, useState } from 'react';
import './App.css';
import Todo, { TodoType } from './Todo';

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Initially fetch todo
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await fetch('http://localhost:8080/');
        if (todos.status !== 200) {
          console.log('Error fetching data');
          return;
        }

        setTodos(await todos.json());
      } catch (e) {
        console.log('Could not connect to server. Ensure it is running. ' + e);
      }
    }

    fetchTodos()
  }, []);

  // Psuedo code due to running out of time, and errors I couldn't resolve

  // the skeleton code sets up a react application that fetches and displays a list of to do items from a backend server
  // it uses the useEffect hook to make an initial GET request to the server to retrieve the to do list and display it in the GUI
  // the to do items are displayed as a list of components, where each component represents a single to do item
  // the code is missing the implementation of the form submission functionality
  
  // define a function that will handle form submission
  // access the title and description fields from the form
  // get the values of the title and description fields from the form
  // convert the values into JSON format, since the backend server expects the data in JSON format
  // send a POST request to the server at http://localhost:8080/ to create a new to do item
  // include the JSON data in the body of the request
  // check if the server responds with a success status code
  // if the response is not successful, throw an error
  // if the response is successful, read the JSON data from the response, which contains the newly created to do item
  // add the new to do item to the list of existing todos
  // if any errors occur during this process log the error message


  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO</h1>
      </header>

      <div className="todo-list">
        {todos.map((todo) =>
          <Todo
            key={todo.title + todo.description}
            title={todo.title}
            description={todo.description}
          />
        )}
      </div>

      <h2>Add a Todo</h2>
      <form>
        <input placeholder="Title" name="title" autoFocus={true} />
        <input placeholder="Description" name="description" />
        <button>Add Todo</button>
      </form>
    </div>
  );
}

export default App;
