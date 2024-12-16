require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la API de Mistral
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY; // Clave en .env
const MISTRAL_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';

// Ruta para manejar solicitudes a Mistral
app.post('/api/mistral', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Llamada simulada a la API de Mistral
    const modelResponse = await axios.post(
      MISTRAL_ENDPOINT,
      {
        model: 'mistral-tiny',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Simulación de una respuesta adicional con datos sugeridos
    const content = modelResponse.data.choices[0].message.content;
    const extractedData = extractFormDataFromPrompt(prompt); // Simular extracción de datos

    res.json({
      response: content,
      formData: extractedData, // Datos sugeridos
    });
  } catch (error) {
    console.error('Error al consultar el modelo:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Función de extracción de datos del prompt
function extractFormDataFromPrompt(prompt) {
  const extractedData = {};

  // Buscar patrones específicos usando expresiones regulares
  const nombreMatch = prompt.match(/(me llamo|nombre es)\s+([\w\s]+)/i);
  const projectMatch = prompt.match(/(proyecto es|proyecto)\s+([\w\s]+)/i);
  const descriptionMatch = prompt.match(/(descripción es|descripción)\s+([\w\s]+)/i);
  const emailMatch = prompt.match(/(correo es|email es)\s+([\w\.\-]+@[a-zA-Z]+\.[a-zA-Z]+)/i);

  // Asignar los valores encontrados
  extractedData.nombre = nombreMatch ? nombreMatch[2].trim() : '';
  extractedData.project = projectMatch ? projectMatch[2].trim() : '';
  extractedData.description = descriptionMatch ? descriptionMatch[2].trim() : '';
  extractedData.email = emailMatch ? emailMatch[2].trim() : '';

  return extractedData;
}


// Ruta para guardar datos en un archivo JSON
app.post('/api/save', (req, res) => {
  const data = req.body;

  // Ruta del archivo JSON donde se guardarán los datos
  const filePath = path.join(__dirname, 'data.json');

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar los datos:', err);
      return res.status(500).json({ error: 'Error al guardar los datos' });
    }
    res.json({ message: 'Datos guardados correctamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
