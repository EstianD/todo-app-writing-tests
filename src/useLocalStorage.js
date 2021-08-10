import { useState } from "react";

export default function useLocalStorage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState();
  const [todos, setTodos] = useState(() => {
    const savedTodos = window.localStorage.getItem("app-todos");
    if (savedTodos) {
      return [...JSON.parse(savedTodos)];
    }
    return [];
  });

  function handleSubmit() {
    // Check for empty input
    if (input !== "") {
      // Save todo
      const todosCopy = [...todos];
      todosCopy.push(input);

      // Check for duplicate entry
      if (todos.includes(input)) {
        setError("Duplicate task!");
      } else {
        window.localStorage.setItem("app-todos", JSON.stringify(todosCopy));

        setTodos([...todosCopy]);
        setError("");
        setInput("");
      }
    }

    if (input === "") {
      setError("Input cannot be empty!");
    }
  }

  function deleteTodo(index) {
    console.log(index);
    const todosCopy = [...todos];

    const res = todosCopy.filter((todo, i) => i !== index);
    window.localStorage.setItem("app-todos", JSON.stringify(res));

    setTodos([...res]);
  }

  return { input, setInput, handleSubmit, todos, error, deleteTodo };
}
