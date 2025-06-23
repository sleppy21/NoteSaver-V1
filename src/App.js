import React, { useState, useEffect } from 'react'
import NoteForm from './NoteForm'
import NoteList from './NoteList'
import { Container, Row, Col, InputGroup, FormControl, Button, Badge } from 'react-bootstrap'

function App() {
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem("notes")
    if (stored) setNotes(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = note => setNotes([...notes, note])
  const deleteNote = i => setNotes(notes.filter((_, j) => j!==i))
  const editNote = (i, updated) => {
    const arr = [...notes]; arr[i]=updated; setNotes(arr)
  }
  const clearAll = () => setNotes([])

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(filter.toLowerCase()) ||
    n.content.toLowerCase().includes(filter.toLowerCase()) ||
    (n.url && n.url.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h1><Badge bg="primary">NoteSaver</Badge></h1></Col>
      </Row>
      <Row className="mb-3">
        <Col md={8}>
          <InputGroup>
            <FormControl
              placeholder="Buscar..."
              value={filter}
              onChange={e=>setFilter(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={()=>setFilter('')}>✕</Button>
          </InputGroup>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="danger" onClick={clearAll}>Borrar todo</Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}><NoteForm onAdd={addNote}/></Col>
        <Col md={6}>
          <p>Total: <Badge bg="info">{notes.length}</Badge></p>
          <NoteList notes={filtered} onDelete={deleteNote} onEdit={editNote} />
        </Col>
      </Row>
    </Container>
  )
}

export default App
