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
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <p id="submission-result" class="mt-3"></p>
      </div>
    </div>
  `;

  // Agregar manejador de eventos
  container.querySelector('#project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = container.querySelector('#nombre').value;
    const project = container.querySelector('#project').value;
    const description = container.querySelector('#description').value;
    const email = container.querySelector('#exampleInputEmail1').value;

    container.querySelector('#submission-result').innerText = `
      Datos enviados:
      Nombre: ${nombre}
      Proyecto: ${project}
      Descripción: ${description}
      Email: ${email}
    `;
  });
}
