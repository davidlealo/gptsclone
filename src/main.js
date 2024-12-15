import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body">
        <form>
  <div class="mb-3">
    <label for="response" class="form-label" id="response"></label>

    <label for="prompt" class="form-label">Prompt</label>
    <input type="text" class="form-control" id="prompt-agent" aria-describedby="prompt-agent">
  </div>
  <button type="submit" class="btn btn-primary">Consultar</button>
</form>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <form>
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
      </div>
    </div>
  </div>
</div>
`