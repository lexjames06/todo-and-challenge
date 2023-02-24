import { TodoContainer } from "../../molecules";
import type { Todo } from "../../types";
import styles from "./TodoList.module.css";

type TodoListProps = {
	emptyMessage: string;
	id?: string;
	isTodoAuthor: boolean;
	title: string;
	todos: Todo[];
}

export const TodoList = ({ title, todos, isTodoAuthor, id, emptyMessage }: TodoListProps) => {
	return (
		<div className={styles.container}>
			<div key={title} className={styles.listContainer}>
				<h3>{title} - {todos.length}</h3>
				{!!todos.length ? (
					todos.map((todo) => (
						<TodoContainer
							key={todo.id}
							todo={todo}
							userId={id!}
							isTodoAuthor={isTodoAuthor}
						/>
					))
				) : (
					<p className={styles.emptyMessage}>{emptyMessage}</p>
				)}
			</div>
		</div>
	);
};
