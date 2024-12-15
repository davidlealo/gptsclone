import './style.css';
import { renderPromptForm } from './prompt.js';
import { renderProjectForm } from './form.js';

// Renderizar los componentes en el DOM
document.querySelector('#app').innerHTML = `
  <div class="row">
    <div class="col-sm-6 mb-3 mb-sm-0" id="prompt-container"></div>
    <div class="col-sm-6" id="form-container"></div>
  </div>
`;

// Llamar a las funciones de renderizado
renderPromptForm(document.querySelector('#prompt-container'));
renderProjectForm(document.querySelector('#form-container'));
