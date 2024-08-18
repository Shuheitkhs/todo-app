import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState, Todo } from '../recoil/atoms';
// 一意のID生成
import { v4 as uuidv4 } from 'uuid';
// firebaseと連携
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [todoList, setTodoList] = useRecoilState(todoListState);
// todo作成の関数・通信のためにasyncを使う
const addTodo = async () => {
    console.log("addTodo called"); // 関数呼び出し確認
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      status: '未着手',
      details,
    };
// 作ったものを配列に加える
    try {
    console.log("デバッグ用、Firestoreに追加");
    const docRef = await addDoc(collection(db, 'todos'), newTodo);
    console.log('デバッグ用、idと一緒に記載: ', docRef.id);

    setTodoList([...todoList, newTodo]);
// 追加後フォームのクリア
    setTitle('');
    setDetails('');
} catch (e) {
    console.error('Error adding document: ', e);
  }
};

  return (
    <div>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="タイトル"
      />
      <input 
        type="text" 
        value={details} 
        onChange={(e) => setDetails(e.target.value)} 
        placeholder="詳細"
      />
      <button onClick={addTodo}>TODOを追加</button>
    </div>
  );
};

export default AddTodo;
