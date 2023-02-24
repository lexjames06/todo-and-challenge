import { HttpStatusCode } from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Toggle } from "../../atoms";
import { useHandleTodos, useHandleUser } from "../../hooks";
import { NewTodoForm, SpinnerContainer } from "../../molecules";
import { TodoList } from "../../organisms";
import { StoreContext } from "../../store";
import { uuidRegExp } from "../../utils";
import styles from "./UserTodos.module.css";

export const UserTodosPage = () => {
  const { todos, getTodos } = useHandleTodos();
  const { user, userLoading, updateUser } = useHandleUser();
  const { ui: { darkMode }, setters: { setUiState } } = useContext(StoreContext);
  const { id } = useParams();
  const location = useLocation();

  const [showOptions, setShowOptions] = useState<boolean>(false);

  const completed = todos?.data?.list.filter((todo) => todo.completed) ?? [];
	const uncompleted = todos?.data?.list.filter((todo) => !todo.completed) ?? [];
  const isTodoAuthor = !!id && user?.id === id;
  const isLoading = !id || userLoading || todos.isLoading || (!todos.data && !todos.error);
	const todoLists = [
		{
			title: "Todo",
			todos: uncompleted,
			emptyMessage: "No tasks left",
		},
		{
			title: "Completed",
			todos: completed,
			emptyMessage: "Let's complete some tasks",
		},
	];

  useEffect(() => {
		if (id) {
			getTodos(id);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);


	if (todos.error?.code === HttpStatusCode.Unauthorized) {
		return (
			<div className={styles.errorContainer}>
				<h1>You are not authorized to see this todo list</h1>
			</div>
		);
	}

	if (!uuidRegExp.test(location.pathname) || todos.error?.code === HttpStatusCode.NotFound) {
		return (
			<div className={styles.errorContainer}>
				<h1>It looks like that user does not exist</h1>
			</div>
		);
	}

  return (
    <SpinnerContainer isLoading={isLoading}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Todo List</h1>
          {isTodoAuthor && (
            <div
              className={styles.optionsButton}
              data-active={showOptions}
              onClick={() => setShowOptions((show) => !show)}
            >
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        {isTodoAuthor && (
          <div className={styles.optionsContainer} data-show={showOptions}>
            <p>private</p>
            <Toggle
              flag={!!user.isPrivate}
              onToggle={() => updateUser({ isPrivate: !user.isPrivate, userId: user.id! })}
            />
            <p>dark mode</p>
            <Toggle
              flag={darkMode}
              onToggle={() => setUiState((oldState) => ({ ...oldState, darkMode: !darkMode }))}
            />
          </div>
        )}

        {isTodoAuthor && <NewTodoForm />}

        {todoLists.map((list) => (
          <TodoList
            key={list.title}
            id={id}
            title={list.title}
            todos={list.todos}
            emptyMessage={list.emptyMessage}
            isTodoAuthor={isTodoAuthor}
          />
          ))}
      </div>
    </SpinnerContainer>
  )
}
