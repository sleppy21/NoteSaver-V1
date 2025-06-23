import React, { useState } from 'react'
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function NoteList({ notes, onDelete, onEdit }) {
  const [editIdx, setEditIdx] = useState(null)
  const [temp, setTemp] = useState({ title:'', content:'' })

  const openEdit = (i,n) => {
    setEditIdx(i)
    setTemp({ title:n.title, content:n.content })
  }
  const saveEdit = () => {
    onEdit(editIdx, { ...temp, date: new Date().toLocaleString() })
    setEditIdx(null)
  }
  const close = () => setEditIdx(null)

  return (
    <>
      <TransitionGroup className="list-unstyled">
        {notes.map((n,i) => (
          <CSSTransition key={i} timeout={500} classNames="fade">
            <Card className="mb-2">
              <Card.Body>
                <Card.Title>{n.title}</Card.Title>
                <Card.Text>{n.content}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{n.date}</Card.Subtitle>
                <Button size="sm" variant="primary" onClick={()=>openEdit(i,n)}>Editar</Button>{' '}
                <Button size="sm" variant="danger" onClick={()=>onDelete(i)}>🗑️</Button>
              </Card.Body>
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <Modal show={editIdx!==null} onHide={close}>
        <Modal.Header closeButton><Modal.Title>Editar nota</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Título</Form.Label>
            <Form.Control
              value={temp.title}
              onChange={e=>setTemp({...temp, title:e.target.value})}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              value={temp.content}
              onChange={e=>setTemp({...temp, content:e.target.value})}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>Cancelar</Button>
          <Button variant="success" onClick={saveEdit}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NoteList
