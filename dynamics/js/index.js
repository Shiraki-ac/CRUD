document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('formularioTarea').addEventListener('submit', crearTarea);
  let tareas = [];
  let tareaEditando = -1; 

  function crearTarea(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const materia = document.getElementById('materia').value;
    const descripcion = document.getElementById('descripcion').value;

    if (titulo.trim() === '' || descripcion.trim() === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const tareaExistente = tareas.find((tarea, index) => {
      return tarea.titulo === titulo && index !== tareaEditando;
    });

    if (tareaExistente) {
      alert('La tarea ya existe. Por favor, ingrese un título diferente.');
      return;
    }

    const tarea = {
      titulo: titulo,
      descripcion: descripcion,
      materia: materia
    };

    if (tareaEditando !== -1) {
      tareas[tareaEditando] = tarea;
      tareaEditando = -1; 
    } else {

      tareas.push(tarea);
    }

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
    tareaEditando = index;

    document.getElementById('titulo').value = tarea.titulo;
    document.getElementById('materia').value = tarea.materia;
    document.getElementById('descripcion').value = tarea.descripcion;

    const botonGuardar = document.createElement('button');
    botonGuardar.setAttribute('type', 'button');
    botonGuardar.classList.add('btn', 'btn-success');
    botonGuardar.innerText = 'Guardar';
    botonGuardar.addEventListener('click', crearTarea);

    const botonCancelar = document.createElement('button');
    botonCancelar.setAttribute('type', 'button');
    botonCancelar.classList.add('btn', 'btn-secondary');
    botonCancelar.innerText = 'Cancelar';
    botonCancelar.addEventListener('click', cancelarEdicion);

    const divBotones = document.createElement('div');
    divBotones.classList.add('btn-group');
    divBotones.appendChild(botonGuardar);
    divBotones.appendChild(botonCancelar);

    const formulario = document.getElementById('formularioTarea');
    formulario.appendChild(divBotones);
  }

  function cancelarEdicion() {
    tareaEditando = -1;
    document.getElementById('formularioTarea').reset();
    const formulario = document.getElementById('formularioTarea');
    formulario.removeChild(formulario.lastElementChild);
  }
});
