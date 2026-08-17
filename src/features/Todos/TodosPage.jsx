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

  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previous) => [newTodo, ...previous]);
  }

  function completeTodo(id) {
    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo,
      ),
    );
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo,
    );

    setTodoList(updatedTodos);
  }

  return (
    <>
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
