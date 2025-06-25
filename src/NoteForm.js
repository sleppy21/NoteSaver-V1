import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [err, setErr] = useState(null);

  const deriveTitle = rawUrl => {
    try {
      const u = new URL(rawUrl);
      return u.hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const handleSave = () => {
    setErr(null);
    if (!content.trim()) {
      setErr('El contenido no puede estar vacío.');
      return;
    }
    let finalTitle = title.trim();
    if (!finalTitle && url.trim()) {
      const derived = deriveTitle(url.trim());
      if (!derived) {
        setErr('La URL no es válida y falta título.');
        return;
      }
      finalTitle = derived;
    }
    if (!finalTitle) {
      setErr('Debe proporcionar al menos un título o una URL válida.');
      return;
    }
    onAdd({
      title: finalTitle,
      url: url.trim() || null,
      content: content.trim(),
      date: new Date().toLocaleString()
    });
    setTitle(''); setUrl(''); setContent('');
  };

  return (
    <Card className="note-card">
      <Card.Body>
        <h5>Añadir nueva nota</h5>
        {err && <Alert variant="danger" onClose={() => setErr(null)} dismissible>{err}</Alert>}
        <Form.Group className="mb-2">
          <Form.Label>Título (opcional si URL válida)</Form.Label>
          <Form.Control
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título de la nota"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>URL (opcional si título)</Form.Label>
          <Form.Control
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Contenido *</Form.Label>
          <Form.Control
            as="textarea" rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Escribe aquí..."
          />
        </Form.Group>
        <Button variant="success" onClick={handleSave}>Guardar nota</Button>
      </Card.Body>
    </Card>
  );
}

export default NoteForm;
