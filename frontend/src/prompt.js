export function renderPromptForm(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Consulta con Prompt</h5>
        <form id="prompt-form">
          <div class="mb-3">
            <label for="prompt-agent" class="form-label">Prompt</label>
            <input type="text" class="form-control" id="prompt-agent" aria-describedby="prompt-agent" placeholder="Escribe tu prompt aquí">
          </div>
          <button type="submit" class="btn btn-primary">Consultar</button>
        </form>
        <p id="response" class="mt-3"></p>
      </div>
    </div>
  `;

  // Manejador de eventos para el formulario
  container.querySelector('#prompt-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = container.querySelector('#prompt-agent').value;
    const responseElement = container.querySelector('#response');

    // Mensaje de carga
    responseElement.innerText = 'Cargando...';

    try {
      // Solicitud al backend en la ruta correcta
      const response = await fetch('http://localhost:3000/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      // Manejo de errores
      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor');
      }

      // Mostrar la respuesta
      const data = await response.json();
      responseElement.innerText = `Respuesta: ${data.response}`;
    } catch (error) {
      console.error('Error:', error.message);
      responseElement.innerText = 'Error al obtener la respuesta. Inténtalo de nuevo.';
    }
  });
}
