import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../utils/todoValidation.js'; 

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }
  const handleUpdate = () => {
  onUpdateTodo({
    ...todo,
    title: workingTitle,
  });

  setIsEditing(false);
};
   return (
  <li>
    {isEditing ? (
      <>
        <TextInputWithLabel
  value={workingTitle}
  onChange={(event) => setWorkingTitle(event.target.value)}
/>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button 
        type="button"
         onClick={handleUpdate}
         disabled={!isValidTodoTitle(workingTitle)}
         >
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
        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
      </>
    )}
  </li>
);
}
export default TodoListItem;