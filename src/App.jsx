import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import './style.css'

function App() {
  // STATE
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  // SAVE to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // DERIVED VALUES
  const remaining = todos.filter((todo) => !todo.done).length
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })

  // ACTIONS
  function addTodo() {
    if (text.trim() === '') return
    const newTodo = { id: Date.now(), text: text, done: false }
    setTodos([...todos, newTodo])
    setText('')
  }

  function toggleTodo(id) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function editTodo(id, newText) {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.done))
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

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Done</button>
      </div>

      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>

      {visibleTodos.length === 0 && <p className="empty">Nothing here!</p>}

      <div className="footer">
        <p className="counter">{remaining} of {todos.length} tasks left</p>
        <button className="clear" onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  )
}

export default App