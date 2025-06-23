import React, { useState } from 'react'

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSave = () => {
    if (!title || !content) return
    onAdd({ title, content })
    setTitle("")
    setContent("")
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `${title || "nota"}.txt`
    a.click()
  }

  return (
    <div>
      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: "100%", marginTop: 10 }}
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ width: "100%", height: 100, marginTop: 5 }}
      />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleDownload}>Descargar</button>
    </div>
  )
}

export default NoteForm
