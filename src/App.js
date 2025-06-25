import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import {
  Container, Row, Col,
  InputGroup, FormControl, Button, Badge
} from 'react-bootstrap';

function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('');

  // Carga inicial
  useEffect(() => {
    const stored = localStorage.getItem('notes');
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  // Guarda en cache
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Agrega nota al inicio
  const addNote = note => setNotes([note, ...notes]);
  const deleteNote = idx => setNotes(notes.filter((_, i) => i !== idx));
  const editNote = (idx, updated) => {
    const arr = [...notes]; arr[idx] = updated; setNotes(arr);
  };
  const clearAll = () => setNotes([]);

  // Descargar todas
  const downloadAll = () => {
    if (!notes.length) return;
    const text = notes.map(n => {
      let head = `Título: ${n.title}\n`;
      if (n.url) head += `URL: ${n.url}\n`;
      head += `Fecha: ${n.date}\n\n`;
      return head + n.content;
    }).join('\n' + '-'.repeat(40) + '\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `todas_notas_${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
  };

  // Filtrado
  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(filter.toLowerCase()) ||
    n.content.toLowerCase().includes(filter.toLowerCase()) ||
    (n.url && n.url.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <Container className="py-4">
      <Row className="mb-3 align-items-center">
        <Col><h1><Badge bg="secondary">NoteSaver Pro</Badge></h1></Col>
        <Col className="text-end">
          <Button variant="outline-danger" onClick={clearAll} className="me-2">
            Borrar todo
          </Button>
          <Button variant="outline-primary" onClick={downloadAll}>
            Descargar todas
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="🔍 Buscar..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setFilter('')}>✕</Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={5}><NoteForm onAdd={addNote} /></Col>
        <Col md={7}>
          <p>Total de notas: <Badge bg="info">{notes.length}</Badge></p>
          <NoteList
            notes={filtered}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
