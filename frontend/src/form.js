export function renderProjectForm(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Datos del Proyecto</h5>
        <form id="project-form">
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" aria-describedby="nombre">
          </div>
          <div class="mb-3">
            <label for="project" class="form-label">Project name</label>
            <input type="text" class="form-control" id="project" aria-describedby="project">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description project</label>
            <input type="text" class="form-control" id="description" aria-describedby="description">
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          </div>
          <button type="submit" class="btn btn-primary">Grabar</button>
        </form>
        <p id="submission-result" class="mt-3"></p>
      </div>
    </div>
  `;

  // Manejador del evento submit del formulario
  container.querySelector('#project-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener valores de los campos
    const nombre = container.querySelector('#nombre').value;
    const project = container.querySelector('#project').value;
    const description = container.querySelector('#description').value;
    const email = container.querySelector('#exampleInputEmail1').value;

    // Objeto con los datos del formulario
    const formData = { nombre, project, description, email };

    // Enviar datos al backend para guardar en JSON
    try {
      const response = await fetch('http://localhost:3000/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        container.querySelector('#submission-result').innerText = 'Datos guardados correctamente.';
      } else {
        throw new Error('Error al guardar los datos.');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error.message);
      container.querySelector('#submission-result').innerText = 'Error al guardar los datos. Inténtalo de nuevo.';
    }
  });
}
