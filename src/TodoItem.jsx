import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  function startEditing() {
    setDraft(todo.text)
    setIsEditing(true)
  }

  function saveEdit() {
    if (draft.trim() !== '') {
      onEdit(todo.id, draft.trim())
    }
    setIsEditing(false)
  }

  function cancelEdit() {
    setDraft(todo.text)
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className={todo.done ? 'done' : ''}
          onClick={() => onToggle(todo.id)}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button className="edit" onClick={saveEdit}>💾</button>
      ) : (
        <button className="edit" onClick={startEditing}>✏️</button>
      )}

      <button className="delete" onClick={() => onDelete(todo.id)}>✕</button>
    </li>
  )
}

export default TodoItem