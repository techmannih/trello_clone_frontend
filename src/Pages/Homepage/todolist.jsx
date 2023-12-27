import React, { useState, useEffect } from "react";
import TodoList from "../Homepage/todo";
import "../Home.css";

function todoList() {
  const [todoLists, setTodoLists] = useState([]);
  const [addTodoListInputValue, setAddTodoListInputValue] = useState("");

  const fetchTodoLists = async () => {
    try {
      const response = await fetch("http://localhost:8888/todolists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const todoListsData = await response.json();
        setTodoLists(todoListsData.todo);
        console.log("Fetch all todo lists:", todoListsData.todo);
      } else {
        console.error("Error fetching todo lists:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching todo lists:", error);
    }
  };
  useEffect(() => {
    fetchTodoLists();
  }, []);
  const addTodoListHandler = async () => {
    if (addTodoListInputValue.trim() !== "") {
      try {
        const response = await fetch("http://localhost:8888/todolists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: addTodoListInputValue }), // Provide the request body with the title
        });

        if (response.ok) {
          const newTodoList = await  response.json()
          for(var i = 0; i <= newTodoList; i++)
           {
               console.log(result.tasks[i].taskName);
           }

          console.log(newTodoList);
          console.log(todoLists)
          setTodoLists([...todoLists, newTodoList.title]);
          setAddTodoListInputValue("");
        } else {
          console.error("Error adding todo list:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding todo list:", error);
      }
    }
  };
  const deleteTodoList = async (id) => {
    try {
      const response = await fetch(`http://localhost:8888/todolist/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedTodoLists = todoLists.filter((todo) => todo._id !== id);
        setTodoLists(updatedTodoLists);
      } else {
        console.error("Error deleting todo list:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting todo list:", error);
    }
  };
  return (
    <div className="justify-center flex-wrap">
      <h1 className=" flex justify-center items-center text-white text-2xl p-8">
        Hello User!
      </h1>
      <div className=" flex justify-center p-2">
        <input
          className="border-white bg-black p-2   border-2  text-white rounded-l-lg  "
          type="text"
          id="addTodoListInput"
          value={addTodoListInputValue}
          onChange={(e) => setAddTodoListInputValue(e.target.value)}
        />
        <button
          id="addTodoListButton"
          onClick={addTodoListHandler}
          className="hover:bg-black hover:text-white bg-white text-black rounded-r p-2 font-bold"
        >
          Add Todo
        </button>
      </div>

      <div id="" className="flex justify-center flex-wrap">
        {todoLists.map((todoList) => (
          // console.log(todoList)
          <TodoList
            key={todoList._id}
            titleId={todoList._id}
            todoList={todoList}
            deleteTodoList={() => deleteTodoList(todoList._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default todoList;
