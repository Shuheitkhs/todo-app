import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListState } from '../recoil/atoms';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const todoList = useRecoilValue(todoListState);

  return (
    <div>
        {/* 0なら無い、ある場合はIDをkeyにした表示 */}
      {todoList.length === 0 ? (
        <p>TODOがありません</p>
      ) : (
        todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
};

export default TodoList;
