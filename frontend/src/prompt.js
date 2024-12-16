export function renderPromptForm(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Conversación con el Modelo</h5>
        <div id="chat-container" class="mb-3" style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; border-radius: 8px; background-color: #f8f9fa;"></div>
        <form id="prompt-form">
          <div class="mb-3">
            <label for="prompt-agent" class="form-label">Prompt</label>
            <input type="text" class="form-control" id="prompt-agent" placeholder="Escribe tu mensaje aquí">
          </div>
          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
        <button id="fill-form-btn" class="btn btn-success mt-3" style="display: none;">Usar esta propuesta para completar el formulario</button>
      </div>
    </div>
  `;

  const chatContainer = container.querySelector('#chat-container');
  const fillFormButton = container.querySelector('#fill-form-btn');
  let currentFormData = null;

  // Manejar envío del prompt
  container.querySelector('#prompt-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const prompt = container.querySelector('#prompt-agent').value;

    if (!prompt.trim()) return;

    appendMessage(chatContainer, 'Tú', prompt);

    try {
      const response = await fetch('http://localhost:3000/api/mistral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Error en la solicitud al servidor.');

      const data = await response.json();
      const modelResponse = data.response;
      currentFormData = data.formData;

      appendMessage(chatContainer, 'Modelo', modelResponse);

      // Mostrar botón si hay datos sugeridos
      if (Object.values(currentFormData).some((val) => val)) {
        fillFormButton.style.display = 'block';
      } else {
        fillFormButton.style.display = 'none';
      }
    } catch (error) {
      console.error('Error:', error.message);
      appendMessage(chatContainer, 'Error', 'No se pudo obtener una respuesta del modelo.');
    }
  });

  // Manejar "Usar esta propuesta"
  fillFormButton.addEventListener('click', () => {
    rellenarFormulario(currentFormData);
    appendMessage(chatContainer, 'Sistema', 'Formulario completado con los datos propuestos.');
    fillFormButton.style.display = 'none';
  });
}

// Función para agregar un mensaje al chat
function appendMessage(container, sender, message) {
  const messageElement = document.createElement('div');
  messageElement.style.marginBottom = '10px';
  messageElement.innerHTML = `
    <strong>${sender}:</strong> <span>${message}</span>
  `;
  container.appendChild(messageElement);
  container.scrollTop = container.scrollHeight; // Auto-scroll
}

// Función para rellenar el formulario automáticamente
function rellenarFormulario(data) {
  const nombreInput = document.querySelector('#nombre');
  const projectInput = document.querySelector('#project');
  const descriptionInput = document.querySelector('#description');
  const emailInput = document.querySelector('#exampleInputEmail1');

  if (data.nombre) nombreInput.value = data.nombre;
  if (data.project) projectInput.value = data.project;
  if (data.description) descriptionInput.value = data.description;
  if (data.email) emailInput.value = data.email;
}
