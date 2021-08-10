import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Todo from "./Todo";

// Create global state
let getByTestId;

beforeEach(() => {
  const component = render(<Todo />);
  getByTestId = component.getByTestId;
});

// Logic tests

test("Test if the input is empty on render", () => {
  const inputEl = getByTestId("todo-input");

  expect(inputEl.value).toBe("");
});

test("Test if error gets shown on empty input submit", () => {
  //   const inputEl = getByTestId("todo-input");
  const buttonEl = getByTestId("add-todo");

  fireEvent.click(buttonEl);
  const errorEl = getByTestId("error");

  expect(errorEl.textContent).toBe("Input cannot be empty!");
});

test("Test if the app can add a todo with mock data", () => {
  const inputEl = getByTestId("todo-input");
  const buttonEl = getByTestId("add-todo");

  fireEvent.change(inputEl, {
    target: {
      value: "testing",
    },
  });

  fireEvent.click(buttonEl);
  const todoEl = getByTestId("todo");

  expect(todoEl.textContent).toBe("testing");
});

test("Test if app can handle duplicate entry notification", () => {
  const inputEl = getByTestId("todo-input");
  const buttonEl = getByTestId("add-todo");

  for (let i = 0; i < 2; i++) {
    fireEvent.change(inputEl, {
      target: {
        value: "testing",
      },
    });

    fireEvent.click(buttonEl);
  }

  const errorEl = getByTestId("error");

  expect(errorEl.textContent).toBe("Duplicate task!");
});

test("Test if the app can delete a entry properly", () => {
  const inputEl = getByTestId("todo-input");
  const buttonEl = getByTestId("add-todo");

  fireEvent.change(inputEl, {
    target: {
      value: "testing",
    },
  });

  fireEvent.click(buttonEl);

  const deleteBtnEl = getByTestId("btn-delete");

  // fireEvent.click(deleteBtnEl)
});
// test("Test if the input gets cleared on submit", () => {});
// test("", () => {});
