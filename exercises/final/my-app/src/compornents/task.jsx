import { useState } from 'react'

function App() {
  // todoリストの状態を管理する。ここが変更されたらReactはTodoリストを描画し直す
  // データの型は{id(number), todoName(string), done(boolean)}の配列
  // 初期状態は空配列
  const [todos, setTodos] = useState([])
  // 新しいTodoを追加するためのIDを管理する。初期値は0
  const [idCounter, setIdCounter] = useState(0)
  // inputの値を管理する。初期値は空文字列
  const [inputValue, setInputValue] = useState("")

  return (
    // まずはHTMLをコピペしたところから改変していった
    <>
      <form id="new-todo-form">
      <input 
        type="text" 
        id="new-todo" 
        placeholder="What needs to be done?"
        value={inputValue}
        // inputの値が変化したときにinputValueを更新する
        onChange={(e) => setInputValue(e.target.value)}
         />
      <button 
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          // 新しいTodoを追加する。
          setTodos([...todos, {id: idCounter, todoName: inputValue, done: false}]);
          // 次のIDのためにidCounterをインクリメントする
          setIdCounter(idCounter + 1);
          // inputの中身を空にする
          setInputValue("");
        }}>
          Add</button>
    </form>
    <ul >
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.todoName}
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => {
              // チェックボックスの状態が変化したときに、対応するTodoのdoneを更新する
              setTodos(todos.map(t => t.id === todo.id ? { ...todo, done: !todo.done } : todo))
            }} 
          />
          <button 
            onClick={() => {
              // 削除ボタンがクリックされたときに、対応するTodoをtodosから削除する
              setTodos(todos.filter(t => t.id !== todo.id))
            }}
          >
              ❌
          </button>
        </div>
      ))}
    </ul>
    </>
  )
}

export default App
