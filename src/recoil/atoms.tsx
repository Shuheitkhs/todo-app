import { atom } from 'recoil';
// 型を決める
export interface Todo {
  id: string;
  title: string;
//   ステータスは未着手・進行中・完了の3種
  status: '未着手' | '進行中' | '完了';
  details: string;
}

// todo
export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

// 文字列の型を探す
export const searchTermState = atom<string>({
    key: 'searchTermState',
    default: '',
  });
  
// ステータスにあわせたものをフィルタ
  export const statusFilterState = atom<'すべて' | '未着手' | '進行中' | '完了'>({
    key: 'statusFilterState',
    default: 'すべて',
  });