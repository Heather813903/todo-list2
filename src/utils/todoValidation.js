export const MAX_TODO_TITLE_LENGTH = 100;

export function isValidTodoTitle(title) {
  return title.trim() !== "" && title.length <= MAX_TODO_TITLE_LENGTH;
}
