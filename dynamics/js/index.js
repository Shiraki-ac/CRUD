document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('formularioTarea').addEventListener('submit', crearTarea);
  let tareas = []; // Array de tareas

  // CREATE TAREAS
  function crearTarea(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const materia = document.getElementById('materia').value;
    const descripcion = document.getElementById('descripcion').value;

    if (titulo.trim() === '' || descripcion.trim() === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verificar si la tarea ya existe
    const tareaExistente = tareas.find(tarea => tarea.titulo === titulo);
    if (tareaExistente) {
      alert('La tarea ya existe. Por favor, ingrese un título diferente.');
      return;
    }

    const tarea = {
      titulo: titulo,
      descripcion: descripcion,
      materia: materia
    };

    tareas.push(tarea);
    document.getElementById('formularioTarea').reset();
    actualizarListaTareas();
  }

  function actualizarListaTareas() {
    const listaTareas = document.getElementById('listaTareas');
    listaTareas.innerHTML = '';

    tareas.forEach((tarea, index) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerHTML = `
        <h5>${tarea.titulo}</h5>
        <p>${tarea.materia}</p><br>
        <p>${tarea.descripcion}</p>
        <div class="btn-group">
          <button type="button" class="btn btn-danger" onclick="eliminarTarea(${index})">Eliminar</button>
          <button type="button" class="btn btn-danger" onclick="editarTarea(${index})">Editar</button>
        </div>
      `;
      listaTareas.appendChild(li);
    });
  }

  function eliminarTarea(index) {
    tareas.splice(index, 1);
    actualizarListaTareas();
  }

  function editarTarea(index) {
    const tarea = tareas[index];
    document.getElementById('titulo').value = tarea.titulo;
    document.getElementById('descripcion').value = tarea.descripcion;

    // Eliminar la tarea actual del array
    tareas.splice(index, 1);

    // Actualizar la lista de tareas
    actualizarListaTareas();
  }
});
