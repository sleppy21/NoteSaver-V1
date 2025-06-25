# 📝 NoteSaver Pro

Aplicación web de gestión de notas creada con React, sin necesidad de backend ni base de datos. Todo se almacena en el cache del navegador (`localStorage`), con un diseño profesional, animaciones fluidas y disposición tipo _masonry_.

---

## 🔥 Características principales

1. **Creación de notas**  
   - Título opcional: si se proporciona solamente una URL válida, se extrae el dominio como título.  
   - URL opcional: si sólo hay un título, la nota se guarda sin URL.  
   - Contenido obligatorio.

2. **Listado tipo Masonry**  
   - Disposición en columnas que se adapta a distintos anchos de pantalla (3/2/1 columnas según tamaño).  
   - Nueva nota “desliza” desde el formulario hasta su posición (_slide-in animation_).  
   - Eliminación con efecto _fade-out_.

3. **Edición inline**  
   - Modal de edición con validaciones idénticas a la creación.  
   - Actualización de fecha automática al guardar cambios.

4. **Descarga de notas**  
   - 📥 Botón individual en cada tarjeta para descargar esa nota como `.txt`.  
   - 📥 Botón “Descargar todas” en la cabecera para exportar todas las notas en un solo archivo.

5. **Eliminación segura**  
   - Confirmación mediante modal antes de borrar cada nota.  
   - Botón “Borrar todo” para limpiar todas las notas de una sola vez.

6. **Persistencia local**  
   - Uso de `localStorage` para guardar y recuperar todas las notas automáticamente.  
   - Sin peticiones de red ni dependencias de servidor.

7. **Diseño y experiencia de usuario**  
   - Basado en **Bootstrap 5** para estructura y componentes.  
   - Tipografía profesional con **Poppins** (UI) y **Merriweather** (texto de notas).  
   - Tarjetas con apariencia de bloc de notas real: líneas suaves de fondo, borde lateral de acento, sombras sutiles.  
   - Animaciones CSS personalizadas para entradas y salidas.

---

## 📦 Estructura del proyecto

```
notesaver-react/
├── public/
│   └── index.html
├── src/
│   ├── index.js           # Punto de entrada React, importa Bootstrap y estilos
│   ├── index.css          # Variables de tema, tipografías, masonry, animaciones
│   ├── App.js             # Contenedor principal, cabecera, filtros y descarga masiva
│   ├── NoteForm.js        # Formulario de creación con validaciones y derivado de título
│   └── NoteList.js        # Listado tipo masonry, edición, eliminación y descargas
├── package.json           # Dependencias y scripts (CRA, React, Bootstrap, react-transition-group)
└── README.md              # Documentación (este archivo)
```

---

## 🚀 Instalación y puesta en marcha

1. **Clona el repositorio**  
   ```bash
   git clone https://github.com/tuusuario/notesaver-react.git
   cd notesaver-react
   ```

2. **Instala dependencias**  
   ```bash
   npm install
   ```

3. **Levanta el servidor de desarrollo**  
   ```bash
   npm start
   ```
   Abre `http://localhost:3000` en tu navegador.

4. **Construye para producción**  
   ```bash
   npm run build
   ```
   El contenido optimizado quedará en la carpeta `build/`.

---

## 🛠 Tecnologías y librerías

- **React 18**  
- **Create React App**  
- **Bootstrap 5** (CSS y JS)  
- **react-transition-group** (animaciones de entrada/salida)  
- **localStorage** (persistencia de datos en cache)  
- **Google Fonts**: Poppins, Merriweather  

---

## 🎨 Diseño y estilos

- Variables CSS en `:root` para colores, sombras y fuentes.  
- Disposición tipo _masonry_ con `column-count` y `break-inside: avoid`.  
- Animaciones personalizadas:
  - **slide-enter**: nueva tarjeta entra desde la derecha.  
  - **fade-exit**: tarjeta sale con desvanecimiento y leve desplazamiento.  
- Tarjetas con fondo simulado de bloc de notas (_background-image_ de líneas finas).

---

## 🤝 Contribuciones

1. Abre un _issue_ describiendo tu propuesta.  
2. Haz un _fork_ y crea una rama con tu feature (`git checkout -b feature/nombre`).  
3. Haz _commit_ de tus cambios (`git commit -m "Añade feature X"`).  
4. Haz _push_ a tu repositorio (`git push origin feature/nombre`).  
5. Abre un _pull request_.

---

## ⚖️ Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.

---

> **NoteSaver Pro** — Gestión de notas profesional, ligera y completamente offline.  
> Desarrollado con ❤️ y enfoque en UX moderno. 
