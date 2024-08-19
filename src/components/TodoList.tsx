import React from "react";
import { Todo } from "../recoil/atoms";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todoList: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  return (
    <div>
      {todoList.length === 0 ? (
        <p>TODOがありません</p>
      ) : (
        todoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
