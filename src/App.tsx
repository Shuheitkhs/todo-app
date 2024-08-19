import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState, Todo } from "./recoil/atoms";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
// 以下でfirebaseと連携
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

const App: React.FC = () => {
  const setTodoList = useSetRecoilState(todoListState);

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

  return (
    <div className="App">
      <h1>TODOアプリ</h1>
      <AddTodo />
      <Filters />
      <TodoList />
    </div>
  );
};

export default App;
