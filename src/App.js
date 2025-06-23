import React, { useState, useEffect } from 'react'
import NoteForm from './NoteForm'
import NoteList from './NoteList'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("notes")
    if (stored) setNotes(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = (note) => {
    setNotes([...notes, note])
  }

  const deleteNote = (index) => {
    const updated = [...notes]
    updated.splice(index, 1)
    setNotes(updated)
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>📝 NoteSaver</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  )
}

export default App
