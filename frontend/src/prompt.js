export function renderPromptForm(container) {
    container.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Consulta con Prompt</h5>
          <form id="prompt-form">
            <div class="mb-3">
              <label for="prompt-agent" class="form-label">Prompt</label>
              <input type="text" class="form-control" id="prompt-agent" aria-describedby="prompt-agent">
            </div>
            <button type="submit" class="btn btn-primary">Consultar</button>
          </form>
          <p id="response" class="mt-3"></p>
        </div>
      </div>
    `;
  
    // Agregar manejador de eventos
    container.querySelector('#prompt-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const prompt = container.querySelector('#prompt-agent').value;
      container.querySelector('#response').innerText = `Has ingresado el prompt: ${prompt}`;
    });
  }
  