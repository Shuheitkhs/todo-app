import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState, Todo } from "../recoil/atoms";
// firebaseと連携、todoを削除編集する
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// 型の定義
interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const setTodoList = useSetRecoilState(todoListState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDetails, setEditedDetails] = useState(todo.details);
  const [editedStatus, setEditedStatus] = useState(todo.status);

  //   削除用の関数
  const deleteTodo = async () => {
    try {
      console.log("Attempting to delete document with ID:", todo.id);
      await deleteDoc(doc(db, "todos", todo.id));
      setTodoList((oldTodoList) =>
        oldTodoList.filter((item) => item.id !== todo.id)
      );
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  // 編集の保存用の関数
  const saveEdit = async () => {
    try {
      console.log("Attempting to update document with ID:", todo.id);
      await updateDoc(doc(db, "todos", todo.id), {
        title: editedTitle,
        details: editedDetails,
        status: editedStatus, // ステータスを更新
      });
      setTodoList((oldTodoList) =>
        oldTodoList.map((item) =>
          item.id === todo.id
            ? {
                ...item,
                title: editedTitle,
                details: editedDetails,
                status: editedStatus,
              }
            : item
        )
      );
      setIsEditing(false);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full m-1 text-text font-bold py-2 px-4 rounded"
          />
          <input
            type="text"
            value={editedDetails}
            onChange={(e) => setEditedDetails(e.target.value)}
            className="w-full m-1 text-text font-bold py-2 px-4 rounded"
          />
          <select
            value={editedStatus}
            onChange={(e) =>
              setEditedStatus(e.target.value as "未着手" | "進行中" | "完了")
            }
          >
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
          <button
            onClick={saveEdit}
            className="bg-accent hover:bg-accentdark text-text font-bold py-2 px-4 rounded"
          >
            保存
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-2 bg-accent hover:bg-accentdark text-text font-bold py-2 px-4 rounded"
          >
            キャンセル
          </button>
        </>
      ) : (
        <>
          <div className="border-1 mb-1 shadow-md rounded">
            <h3 className="text-text font-bold">{todo.title}</h3>
            <p className="text-text font-bold">{todo.details}</p>
            <p className="text-text font-bold">{todo.status}</p>
            <div className="text-right">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-accent hover:bg-accentdark text-text font-bold py-2 px-4 rounded"
              >
                編集
              </button>
              <button
                onClick={deleteTodo}
                className="ml-2 bg-accent hover:bg-accentdark text-text font-bold py-2 px-4 rounded"
              >
                削除
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
