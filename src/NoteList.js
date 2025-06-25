import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function NoteList({ notes, onDelete, onEdit }) {
  const [editIdx, setEditIdx] = useState(null);
  const [temp, setTemp] = useState({ title: '', url: '', content: '' });
  const [delIdx, setDelIdx] = useState(null);
  const [err, setErr] = useState(null);

  // Abrir edición
  const openEdit = (i, n) => {
    setErr(null);
    setEditIdx(i);
    setTemp({ title: n.title, url: n.url || '', content: n.content });
  };
  // Guardar edición
  const saveEdit = () => {
    if (!temp.content.trim()) { setErr('El contenido no puede estar vacío.'); return; }
    let finalTitle = temp.title.trim();
    if (!finalTitle && temp.url.trim()) {
      try { finalTitle = new URL(temp.url).hostname.replace('www.', ''); }
      catch { setErr('URL inválida y falta título.'); return; }
    }
    if (!finalTitle) { setErr('Debe haber título o URL válida.'); return; }
    onEdit(editIdx, { ...temp, title: finalTitle, date: new Date().toLocaleString() });
    setEditIdx(null);
  };

  // Confirmar borrado
  const confirmDelete = i => setDelIdx(i);
  const handleDelete = () => {
    onDelete(delIdx);
    setDelIdx(null);
  };

  // Descargar individual
  const downloadOne = note => {
    let text = `Título: ${note.title}\n`;
    if (note.url) text += `URL: ${note.url}\n`;
    text += `Fecha: ${note.date}\n\n${note.content}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${note.title.replace(/\s+/g,'_')}.txt`;
    a.click();
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
                    : note.title}
                </Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{note.date}</Card.Subtitle>
                <Button size="sm" variant="outline-success" onClick={() => downloadOne(note)}>
                  📥 Descargar
                </Button>{' '}
                <Button size="sm" variant="outline-primary" onClick={() => openEdit(i, note)}>
                  Editar
                </Button>{' '}
                <Button size="sm" variant="outline-danger" onClick={() => confirmDelete(i)}>
                  🗑️
                </Button>
              </Card.Body>
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>

      {/* Modal edición */}
      <Modal show={editIdx !== null} onHide={() => setEditIdx(null)}>
        <Modal.Header closeButton><Modal.Title>Editar nota</Modal.Title></Modal.Header>
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

      {/* Modal confirm delete */}
      <Modal show={delIdx !== null} onHide={() => setDelIdx(null)}>
        <Modal.Header closeButton><Modal.Title>Confirmar borrado</Modal.Title></Modal.Header>
        <Modal.Body>¿Seguro que deseas eliminar esta nota?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDelIdx(null)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Sí, eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoteList;
