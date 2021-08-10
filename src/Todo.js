import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

export default function Todo() {
  const { input, setInput, handleSubmit, todos, error, deleteTodo } =
    useLocalStorage();

  return (
    <div>
      <h1 data-testid="header">Todo app</h1>
      <input
        data-testid="todo-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button data-testid="add-todo" onClick={handleSubmit}>
        Add
      </button>
      <p data-testid="error" style={{ color: "red" }}>
        {error}
      </p>
      <div>
        {todos.map((todo, i) => (
          <p key={i}>
            <span data-testid="todo">{todo}</span>
            <button data-testid="btn-delete" onClick={() => deleteTodo(i)}>
              Delete
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}
