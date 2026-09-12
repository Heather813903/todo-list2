import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel.jsx";
import {
  isValidTodoTitle,
  MAX_TODO_TITLE_LENGTH,
} from "../../../utils/todoValidation.js";
import styles from "./TodoList.module.css";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!isEditing || !isValidTodoTitle(workingTitle)) return;

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      <form className={styles.itemForm} onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`todoTitle${todo.id}`}
              labelText="Todo"
              value={workingTitle}
              maxLength={MAX_TODO_TITLE_LENGTH}
              onChange={handleEdit}
            />

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>

            <button type="submit" disabled={!isValidTodoTitle(workingTitle)}>
              Update
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
            <span
              className={styles.todoTitle}
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
