import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState, Todo } from '../recoil/atoms';
// firebaseと連携、todoを削除編集する
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
      console.log('Attempting to delete document with ID:', todo.id);
      await deleteDoc(doc(db, 'todos', todo.id));
      setTodoList((oldTodoList) => oldTodoList.filter((item) => item.id !== todo.id));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

// 編集の保存用の関数
const saveEdit = async () => {
    try {
      console.log('Attempting to update document with ID:', todo.id);
      await updateDoc(doc(db, 'todos', todo.id), {
        title: editedTitle,
        details: editedDetails,
        status: editedStatus, // ステータスを更新
      });
      setTodoList((oldTodoList) =>
        oldTodoList.map((item) =>
          item.id === todo.id
            ? { ...item, title: editedTitle, details: editedDetails, status: editedStatus }
            : item
        )
      );
      setIsEditing(false);
    } catch (e) {
      console.error('Error updating document: ', e);
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
          />
          <input 
            type="text" 
            value={editedDetails} 
            onChange={(e) => setEditedDetails(e.target.value)} 
          />
          <select
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value as '未着手' | '進行中' | '完了')}
          >
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
          <button onClick={saveEdit}>保存</button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>
          <p>{todo.details}</p>
          <p>{todo.status}</p>
          <button onClick={() => setIsEditing(true)}>編集</button>
          <button onClick={deleteTodo}>削除</button>
        </>
      )}
    </div>
  );
};


export default TodoItem;
