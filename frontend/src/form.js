export function renderProjectForm(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Datos del Proyecto</h5>
        <form id="project-form">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre">
          </div>
          <div class="mb-3">
            <label for="project" class="form-label">Project name</label>
            <input type="text" class="form-control" id="project">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description project</label>
            <input type="text" class="form-control" id="description">
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1">
          </div>
          <button type="submit" class="btn btn-primary">Grabar</button>
        </form>
        <p id="submission-result" class="mt-3"></p>
      </div>
    </div>
  `;

  container.querySelector('#project-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const formData = {
      nombre: document.querySelector('#nombre').value,
      project: document.querySelector('#project').value,
      description: document.querySelector('#description').value,
      email: document.querySelector('#exampleInputEmail1').value,
    };

    try {
      // Guardar en el backend
      const response = await fetch('http://localhost:3000/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        document.querySelector('#submission-result').innerText = 'Datos guardados correctamente.';
      } else {
        throw new Error('Error al guardar los datos.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      document.querySelector('#submission-result').innerText = 'Error al guardar los datos. Inténtalo de nuevo.';
    }
  });
}
