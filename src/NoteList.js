import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function NoteList({ notes, onDelete, onEdit }) {
  const [editIdx, setEditIdx] = useState(null);
  const [temp, setTemp] = useState({ title: '', url: '', content: '' });
  const [err, setErr] = useState(null);

  const openEdit = (i, n) => {
    setErr(null);
    setEditIdx(i);
    setTemp({ title: n.title, url: n.url || '', content: n.content });
  };

  const saveEdit = () => {
    if (!temp.content.trim()) {
      setErr('El contenido no puede estar vacío.');
      return;
    }
    let finalTitle = temp.title.trim();
    if (!finalTitle && temp.url.trim()) {
      try {
        const u = new URL(temp.url.trim());
        finalTitle = u.hostname.replace('www.', '');
      } catch {
        setErr('URL inválida y falta título.');
        return;
      }
    }
    if (!finalTitle) {
      setErr('Debe haber título o URL válida.');
      return;
    }
    onEdit(editIdx, {
      ...temp,
      title: finalTitle,
      date: new Date().toLocaleString()
    });
    setEditIdx(null);
  };

  return (
    <>
      <TransitionGroup className="list-unstyled">
        {notes.map((note, i) => (
          <CSSTransition key={i} timeout={300} classNames="fade">
            <Card className="note-card">
              <Card.Body>
                <Card.Title>
                  {note.url
                    ? <a href={note.url} target="_blank" rel="noopener noreferrer">{note.title}</a>
                    : note.title
                  }
                </Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{note.date}</Card.Subtitle>
                <Button size="sm" variant="outline-primary" onClick={() => openEdit(i, note)}>
                  Editar
                </Button>{' '}
                <Button size="sm" variant="outline-danger" onClick={() => onDelete(i)}>
                  🗑️
                </Button>
              </Card.Body>
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <Modal show={editIdx !== null} onHide={() => setEditIdx(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {err && <p className="text-danger">{err}</p>}
          <Form.Group className="mb-2">
            <Form.Label>Título</Form.Label>
            <Form.Control
              value={temp.title}
              onChange={e => setTemp({ ...temp, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>URL</Form.Label>
            <Form.Control
              value={temp.url}
              onChange={e => setTemp({ ...temp, url: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea" rows={4}
              value={temp.content}
              onChange={e => setTemp({ ...temp, content: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditIdx(null)}>Cancelar</Button>
          <Button variant="success" onClick={saveEdit}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoteList;
