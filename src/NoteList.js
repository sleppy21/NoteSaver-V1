import React from 'react'

function NoteList({ notes, onDelete }) {
  if (!notes.length) return <p>No hay notas</p>

  return (
    <ul style={{ marginTop: 20 }}>
      {notes.map((note, i) => (
        <li key={i} style={{ marginBottom: 10 }}>
          <strong>{note.title}</strong>
          <button onClick={() => onDelete(i)} style={{ marginLeft: 10 }}>🗑️</button>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  )
}

export default NoteList
