import { useState } from 'react'
import './style.css'

function App() {
  // STATE: what the app remembers
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  // ADD a new todo
  function addTodo() {
    if (text.trim() === '') return
    const newTodo = { id: Date.now(), text: text, done: false }
    setTodos([...todos, newTodo])
    setText('')
  }

  // TOGGLE done / not done
  function toggleTodo(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  // DELETE a todo
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // WHAT SHOWS ON SCREEN
  return (
    <div className="app">
      <h1>My Todo List</h1>

      <div className="input-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What do you need to do?"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.text}</span>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="empty">Nothing to do yet!</p>}
    </div>
  )
}

export default App