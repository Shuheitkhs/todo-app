import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoListState, Todo } from "./recoil/atoms";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
// firebaseと連携
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

const App: React.FC = () => {
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(todoListState); // 現在のTODOリストを取得

  const [searchTerm, setSearchTerm] = useState(""); // 検索キーワードの状態管理
  const [statusFilter, setStatusFilter] = useState("すべて"); // ステータスフィルターの状態管理

  // firebaseから情報を受け取って更新
  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      // レビューでの修正前
      // const todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Todo));
      // レビューでの修正後
      const todos = querySnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Todo)
      );
      setTodoList(todos);
    };

    // TodoListが更新されるたびに再レンダ
    fetchTodos();
  }, [setTodoList]);

  // 移動されたfilter機能
  const filteredTodoList = todoList.filter((todo) => {
    const matchesSearchTerm =
      todo.title.includes(searchTerm) || todo.details.includes(searchTerm);
    const matchesStatus =
      statusFilter === "すべて" || todo.status === statusFilter;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-bg shadow-md rounded-lg m-6 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">TODOアプリ</h1>

        <AddTodo />

        {/* 検索バーとステータスフィルター */}
        <input
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as "すべて" | "未着手" | "進行中" | "完了"
            )
          }
        >
          {" "}
          <option value="すべて">すべて</option>
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>

        {/* フィルタリングされたTODOリストの表示 */}
        <TodoList todoList={filteredTodoList} />
      </div>
    </div>
  );
};

export default App;
