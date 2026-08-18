import { useEffect, useState } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList/TodoList.jsx";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError("");
        setIsTodoListLoading(true);

        const params = new URLSearchParams({
          limit: 100,
        });

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setTodoList(data.tasks);
        } else if (response.status === 401) {
          throw new Error("unauthorized");
        } else {
          throw new Error("Failed to fetch todos");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsTodoListLoading(false);
      }
    };

    if (token) {
      fetchTodos();
    }
  }, [token]);

  async function addTodo(todoTitle) {
    setError("");

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previous) => [newTodo, ...previous]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTodoList((previous) =>
          previous.map((todo) => (todo.id === newTodo.id ? data : todo)),
        );
      } else {
        throw new Error("Failed to add todo");
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.filter((todo) => todo.id !== newTodo.id),
      );
      setError(error.message);
    }
  }

  async function completeTodo(id) {
    setError("");

    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      setError("Todo not found");
      return;
    }

    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? originalTodo : todo)),
      );
      setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    setError("");

    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) {
      setError("Todo not found");
      return;
    }

    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === editedTodo.id ? { ...editedTodo } : todo,
      ),
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo,
        ),
      );
      setError(error.message);
    }
  }

  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
          <button type="button" onClick={() => setError("")}>
            Clear Error
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </>
  );
}

export default TodosPage;
