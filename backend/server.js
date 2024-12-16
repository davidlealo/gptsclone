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
    const response = await axios.post(
      MISTRAL_ENDPOINT,
      {
        model: 'mistral-tiny', // Ajusta el modelo según acceso
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

    // Simular extracción de datos para rellenar formulario
    const extractedData = {
      nombre: prompt.includes('nombre') ? 'John Doe' : '',
      project: prompt.includes('proyecto') ? 'Proyecto AI' : '',
      description: prompt.includes('descripción') ? 'Descripción automática del proyecto' : '',
      email: prompt.includes('correo') ? 'john.doe@example.com' : ''
    };

    res.json({ response: extractedData });
  } catch (error) {
    console.error('Error al llamar a la API de Mistral:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al consultar Mistral' });
  }
});

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
