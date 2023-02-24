import { DeleteIcon } from "../../assets";
import { Checkbox } from "../../atoms";
import { useHandleTodos } from "../../hooks";
import type { Todo } from "../../types";
import styles from  "./TodoContainer.module.css";

type TodoContainerProps = {
  isTodoAuthor: boolean;
  todo: Todo;
  userId: string;
}

export const TodoContainer = ({ isTodoAuthor, todo, userId }: TodoContainerProps) => {
  const { updateTodo, deleteTodo } = useHandleTodos();

  const handleUpdateTodo = (oldTodo: Todo) => {
    if (isTodoAuthor) {
      updateTodo({ todo: { ...oldTodo, completed: !oldTodo.completed }, userId });
    }
  };

  return (
    <div className={styles.container}>
      <Checkbox disabled={!isTodoAuthor} checked={todo.completed} onClick={() => handleUpdateTodo(todo)} />
      <p data-completed={todo.completed}>{todo.text}</p>
      {isTodoAuthor && (
        <button className={styles.deleteIcon} onClick={() => deleteTodo({ todoId: todo.id, userId })}>
          <DeleteIcon />
        </button>
      )}
    </div>
  )
};
