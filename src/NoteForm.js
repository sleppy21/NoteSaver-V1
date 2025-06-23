import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSave = () => {
    if (!title||!content) return
    onAdd({ title, content, date: new Date().toLocaleString() })
    setTitle(''); setContent('')
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form.Group className="mb-2">
          <Form.Label>Título</Form.Label>
          <Form.Control
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="Título"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Contenido</Form.Label>
          <Form.Control
            as="textarea" rows={3}
            value={content}
            onChange={e=>setContent(e.target.value)}
            placeholder="Escribe tu nota..."
          />
        </Form.Group>
        <Button variant="success" onClick={handleSave}>Guardar</Button>
      </Card.Body>
    </Card>
  )
}

export default NoteForm
