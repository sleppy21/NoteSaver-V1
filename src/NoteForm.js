import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')

  const handleSave = () => {
    if (!title || !content) return
    onAdd({ title, url: url||null, content, date: new Date().toLocaleString() })
    setTitle(''); setUrl(''); setContent('')
  }

  return (
    <Card className="mb-3 note-card">
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
          <Form.Label>URL (opcional)</Form.Label>
          <Form.Control
            value={url}
            onChange={e=>setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
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
