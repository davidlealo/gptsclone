require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la API de Mistral
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY; // Clave en .env
const MISTRAL_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';

// Ruta para manejar solicitudes
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

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error al llamar a la API de Mistral:', error.message);
    res.status(500).json({ error: 'Error al consultar Mistral' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
