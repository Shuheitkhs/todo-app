import React from 'react';
import { useRecoilState } from 'recoil';
import { statusFilterState, searchTermState, todoListState } from '../recoil/atoms';

const Filters: React.FC = () => {
  const [statusFilter, setStatusFilter] = useRecoilState(statusFilterState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [todoList] = useRecoilState(todoListState);

  const filteredTodoList = todoList.filter((todo) => {
    const matchesSearchTerm = todo.title.includes(searchTerm) || todo.details.includes(searchTerm);
    const matchesStatus = statusFilter === 'すべて' || todo.status === statusFilter;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div>
      <input
        placeholder="検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as 'すべて' | '未着手' | '進行中' | '完了')}
      >
        <option value="すべて">すべて</option>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <div >
        {filteredTodoList.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.details}</p>
            <p>{todo.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
