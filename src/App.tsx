// レビュー後・index.tsx以外のファイルのReactのインポート削除
import { useState, useEffect } from "react";
// import { useSetRecoilState, useRecoilValue } from "recoil";それぞれ状態の取得と、更新を別々で行っていたものが
// レビュー後・状態管理で状態の取得と更新をひとつでできる。
import { useRecoilState } from "recoil";
import { todoListState, Todo } from "./recoil/atoms";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
// firebaseと連携
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

// レビュー後・フィルターの型を定義・ユニオン型で限定
type StatusFilterType = "すべて" | "未着手" | "進行中" | "完了";

const App: React.FC = () => {
  // レビュー後・下記をまとめて
  // const setTodoList = useSetRecoilState(todoListState);
  // const todoList = useRecoilValue(todoListState); // 現在のTODOリストを取得
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const [searchTerm, setSearchTerm] = useState(""); // 検索キーワードの状態管理
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("すべて"); // ステータスフィルターの状態管理

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
  /**
   * jsDocの練習・filter機能の関数
   * @function filteredTodoList　フィルター機能を実行する関数です。
   * @param {Todo} todo 引数にTodo型のtodoをとって、条件に合致する以下のreturnを返す
   * @returns {Todo[]} matchesSearchTermとmatchesStatusが両方trueのものを返す
   */
  const filteredTodoList = todoList.filter((todo) => {
    /**
     * @constant matchesSearchTerm 検索文字列に合致するものを入れた定数
     * @param {Todo} todo 引数にとったtodoに対してincludesで
     * @param {string} searchTerm searchTermを含んでいるか確認
     * @returns {boolean} trueかfalseを返す。
     */
    const matchesSearchTerm =
      todo.title.includes(searchTerm) || todo.details.includes(searchTerm);
    /**
     * @constant matchesStatus statusに合致するものを入れた定数
     * @param {Todo} todo 引数にとったtodoに対して
     * @param {string} statusFilter すべてなら、その時点でtrue,falseならstatusが合致するものを入れる
     * @returns {boolean} trueかfalseを返す。
     */
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
          onChange={(e) => setSearchTerm(e.target.value as string)}
          className="w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilterType)}
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
